const links = Array.from(document.querySelectorAll('.nav__link'));
const triggers = Array.from(document.querySelectorAll('[data-page]'));
const pages = Array.from(document.querySelectorAll('.page'));
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const pageEyebrow = document.querySelector('#page-eyebrow');
const pageTitle = document.querySelector('#page-title');
const pageBack = document.querySelector('#page-back');
const navGroups = Array.from(document.querySelectorAll('.nav__group'));
const navSubgroups = Array.from(document.querySelectorAll('.nav__subgroup'));

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
  if (activePage && pageBack) {
    const backTarget = activePage.dataset.back;
    if (backTarget) {
      pageBack.dataset.page = backTarget;
      pageBack.removeAttribute('aria-hidden');
      pageBack.classList.add('is-visible');
    } else {
      pageBack.setAttribute('aria-hidden', 'true');
      pageBack.classList.remove('is-visible');
    }
  }
};

triggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const isNavLink = trigger.classList.contains('nav__link') || trigger.classList.contains('nav__sublink');
    const inSubmenu = trigger.closest('.nav__sub') || trigger.closest('.nav__subsub');
    if (inSubmenu) {
      event.stopPropagation();
    }
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

const toggleGroup = (element) => {
  const isOpen = element.classList.toggle('is-open');
  return isOpen;
};

navGroups.forEach((group) => {
  const mainLink = group.querySelector('.nav__link');
  if (!mainLink) {
    return;
  }
  mainLink.addEventListener('click', (event) => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      event.preventDefault();
      event.stopPropagation();
      toggleGroup(group);
    }
  });
});

navSubgroups.forEach((subgroup) => {
  const sublink = subgroup.querySelector('.nav__sublink');
  if (!sublink) {
    return;
  }
  sublink.addEventListener('click', (event) => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      event.preventDefault();
      event.stopPropagation();
      toggleGroup(subgroup);
    }
  });
});

const defaultPage = links[0]?.dataset.page;
if (defaultPage) {
  showPage(defaultPage);
}
