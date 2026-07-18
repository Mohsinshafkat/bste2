(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const expanded = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });
  }
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
})();
