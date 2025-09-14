/* ======= Модальные окна ======= */
document.querySelectorAll('.js-open-dialog').forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = document.querySelector('.js-contact-dialog');
    dialog.showModal();
    dialog.querySelector('input, textarea, select')?.focus();
  });
});

document.querySelectorAll('.js-close-dialog').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});

/* ======= Esc закрытие ======= */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog').forEach(d => d.close());
  }
});

/* ======= Переключение темы ======= */
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

/* ======= Маска телефона ======= */
document.querySelectorAll('input[type="tel"]').forEach(input => {
  input.addEventListener('input', e => {
    let numbers = e.target.value.replace(/\D/g, '');
    if (numbers.startsWith('8')) numbers = '7' + numbers.slice(1);
    if (!numbers.startsWith('7')) numbers = '7' + numbers;
    let formatted = '+7 ';
    if (numbers.length > 1) formatted += '(' + numbers.slice(1,4);
    if (numbers.length >= 4) formatted += ') ' + numbers.slice(4,7);
    if (numbers.length >= 7) formatted += '-' + numbers.slice(7,9);
    if (numbers.length >= 9) formatted += '-' + numbers.slice(9,11);
    e.target.value = formatted;
  });
});

/* ======= Валидация форм ======= */
document.querySelectorAll('.js-contact-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = form.checkValidity();
    [...form.elements].forEach(el => {
      if (el.tagName !== 'BUTTON') el.ariaInvalid = !el.checkValidity();
    });
    if (!valid) { form.reportValidity(); return; }
    alert('Форма успешно отправлена!');
    form.reset();
    form.closest('dialog').close();
  });
});

/* ======= Текущий год в футере ======= */
document.getElementById('year')?.textContent = new Date().getFullYear();
