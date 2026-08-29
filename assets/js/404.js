const menuToggle = document.querySelector('.error-menu-toggle');
const navigation = document.querySelector('#error-navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const newsletter = document.querySelector('.newsletter');

if (newsletter) {
  newsletter.addEventListener('submit', (event) => event.preventDefault());
}
