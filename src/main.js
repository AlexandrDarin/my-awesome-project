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

  // Modal logic
  const openBtns = document.querySelectorAll('.js-open-dialog');
  const dialog = document.querySelector('.js-contact-dialog');
  const closeBtn = dialog.querySelector('.js-close-dialog');
  const form = dialog.querySelector('.js-contact-form');
  const successMsg = form.querySelector('.form__success');
  let lastActive = null;

  openBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      lastActive = document.activeElement;
      if(typeof dialog.showModal === 'function'){
        dialog.showModal();
      } else {
        dialog.removeAttribute('hidden');
      }
      dialog.querySelector('input,select,textarea,button')?.focus();
      successMsg.classList.add('hidden');
    });
  });

  closeBtn.addEventListener('click', ()=> dialog.close?.('cancel'));
  dialog.addEventListener('close', ()=> lastActive?.focus());

  // Validation + success
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    [...form.elements].forEach(el => el.setCustomValidity && el.setCustomValidity(''));

    if(!form.checkValidity()){
      const email = form.elements.email;
      if(email?.validity.typeMismatch){
        email.setCustomValidity('Введите корректный e-mail, например name@example.com');
      }
      form.reportValidity();
      [...form.elements].forEach(el => { if(el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity()); });
      return;
    }

    form.reset();
    successMsg.classList.remove('hidden');
    setTimeout(()=> dialog.close?.('success'), 1500);
  });

  // Phone mask
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
  phone?.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');

  // Nav ARIA-current
  document.querySelectorAll('.site-nav__link').forEach(a=>{
    if(a.href === location.href || a.getAttribute('href') === location.pathname.split('/').pop()){
      a.setAttribute('aria-current','page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
});
