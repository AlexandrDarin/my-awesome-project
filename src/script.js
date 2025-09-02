// Добавляет год в подвал
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});