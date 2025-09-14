
// main.js - modal, validation, phone mask, theme toggle
document.addEventListener('DOMContentLoaded', ()=>{

  // Theme toggle
  const KEY='theme', btn=document.querySelector('.theme-toggle');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  if(localStorage.getItem(KEY)==='dark' || (!localStorage.getItem(KEY) && prefersDark)){
    document.body.classList.add('theme-dark');
    btn?.setAttribute('aria-pressed','true');
  }
  btn?.addEventListener('click', ()=>{
    const isDark = document.body.classList.toggle('theme-dark');
    btn.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem(KEY, isDark ? 'dark' : 'light');
  });

  // Dialog modal
  const dlg = document.getElementById('contactDialog');
  const openBtn = document.getElementById('openDialog');
  const closeBtn = document.getElementById('closeDialog');
  const form = document.getElementById('contactForm');
  let lastActive = null;

  openBtn?.addEventListener('click', ()=>{
    lastActive = document.activeElement;
    if(typeof dlg.showModal === 'function'){
      dlg.showModal();
    } else {
      dlg.removeAttribute('hidden');
    }
    dlg.querySelector('input,select,textarea,button')?.focus();
  });
  closeBtn?.addEventListener('click', ()=> dlg.close && dlg.close('cancel'));

  // Validation
  form?.addEventListener('submit', (e)=>{
    [...form.elements].forEach(el => el.setCustomValidity && el.setCustomValidity(''));
    if(!form.checkValidity()){
      e.preventDefault();
      const email = form.elements.email;
      if(email?.validity.typeMismatch){
        email.setCustomValidity('Введите корректный e-mail, например name@example.com');
      }
      form.reportValidity();
      [...form.elements].forEach(el => { if(el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity()); });
      return;
    }
    e.preventDefault();
    // success
    form.reset();
    dlg.close && dlg.close('success');
    alert('Спасибо! Ваше сообщение отправлено (симуляция).');
  });

  // Phone mask (light)
  const phone = document.getElementById('phone');
  phone?.addEventListener('input', ()=>{
    let digits = phone.value.replace(/\D/g,'').slice(0,11);
    digits = digits.replace(/^8/, '7');
    let out = '';
    if(digits.length>0) out = '+'+digits[0];
    if(digits.length>1) out += ' ('+digits.slice(1,4);
    if(digits.length>=4) out += ')';
    if(digits.length>=5) out += ' '+digits.slice(4,7);
    if(digits.length>=8) out += '-'+digits.slice(7,9);
    if(digits.length>=10) out += '-'+digits.slice(9,11);
    phone.value = out;
  });

  // close dialog on escape/backdrop handled by native dialog
  dlg?.addEventListener('close', ()=> { lastActive?.focus(); });

  // make nav links keyboard friendly (aria-current toggle based on URL)
  document.querySelectorAll('.site-nav__link').forEach(a=>{
    if(a.href === location.href || a.getAttribute('href') === location.pathname.split('/').pop()){
      a.setAttribute('aria-current','page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
});
