const modal = document.querySelector(".modal");
const openBtn = document.getElementById("open-modal");
const closeBtn = document.querySelector(".modal__close");
const backdrop = document.querySelector(".modal__backdrop");
const form = document.getElementById("form");
const themeToggle = document.querySelector(".theme-toggle");
const firstField = document.getElementById("name");

function show() {
  modal.hidden = false;
  firstField.focus();
}

function hide() {
  modal.hidden = true;
  openBtn.focus();
}

openBtn.addEventListener("click", show);
closeBtn.addEventListener("click", hide);
backdrop.addEventListener("click", hide);

// Закрытие по Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) hide();
});

// Переключение темы (светлая/тёмная)
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Маска телефона
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", (e) => {
  let numbers = e.target.value.replace(/\D/g, "");
  if (numbers.startsWith("8")) numbers = "7" + numbers.slice(1);
  if (!numbers.startsWith("7")) numbers = "7" + numbers;

  let formatted = "+7 ";
  if (numbers.length > 1) formatted += "(" + numbers.slice(1, 4);
  if (numbers.length >= 4) formatted += ") " + numbers.slice(4, 7);
  if (numbers.length >= 7) formatted += "-" + numbers.slice(7, 9);
  if (numbers.length >= 9) formatted += "-" + numbers.slice(9, 11);

  e.target.value = formatted;
});

// Валидация
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = form.checkValidity();

  [...form.elements].forEach((el) => {
    if (el.tagName !== "BUTTON") {
      el.setCustomValidity("");
      el.ariaInvalid = !el.checkValidity();
    }
  });

  const emailField = document.getElementById("email");
  if (emailField.validity.typeMismatch) {
    emailField.setCustomValidity("Введите корректный e-mail");
    valid = false;
  }

  if (!valid) {
    form.reportValidity();
    return;
  }

  alert("Форма успешно отправлена!");
  form.reset();
  hide();
});
