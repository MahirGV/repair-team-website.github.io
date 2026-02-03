const links = Array.from(document.querySelectorAll('.nav__link'));
const triggers = Array.from(document.querySelectorAll('[data-page]'));
const pages = Array.from(document.querySelectorAll('.page'));
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const pageEyebrow = document.querySelector('#page-eyebrow');
const pageTitle = document.querySelector('#page-title');

const showPage = (id) => {
  pages.forEach((page) => {
    page.classList.toggle('is-visible', page.id === id);
  });
  links.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.page === id);
  });
  const activePage = pages.find((page) => page.id === id);
  if (activePage && pageEyebrow && pageTitle) {
    pageEyebrow.textContent = activePage.dataset.eyebrow || '';
    pageTitle.textContent = activePage.dataset.title || '';
  }
};

triggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (trigger.tagName === 'A') {
      event.preventDefault();
    }
    showPage(trigger.dataset.page);
    if (sidebar) {
      sidebar.classList.remove('is-open');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showPage(trigger.dataset.page);
      if (sidebar) {
        sidebar.classList.remove('is-open');
      }
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const defaultPage = links[0]?.dataset.page;
if (defaultPage) {
  showPage(defaultPage);
}
