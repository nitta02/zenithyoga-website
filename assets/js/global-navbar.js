(function () {
  // Resolve shared assets from this script so nested pages work too.
  const base = new URL('../../', document.currentScript.src);

  async function initialize() {
    const mount = document.querySelector('[data-site-navbar]');
    if (!mount) return;

    if (!document.querySelector('link[data-global-navbar-styles]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = new URL('assets/css/global-navbar.css', base).href;
      stylesheet.dataset.globalNavbarStyles = '';
      document.head.appendChild(stylesheet);
    }

    try {
      const response = await fetch(new URL('global_navbar.html', base));
      if (!response.ok) throw new Error(`Navbar request failed: ${response.status}`);
      mount.innerHTML = await response.text();
    } catch (error) {
      console.error('Unable to load the global navbar.', error);
      return;
    }

    mount.querySelectorAll('[href], [src]').forEach(element => {
      const attribute = element.hasAttribute('href') ? 'href' : 'src';
      element.setAttribute(attribute, new URL(element.getAttribute(attribute), base).href);
    });

    const page = location.pathname.replace(/\/$/, '/index.html');
    const sections = {
      'private-yoga.html': 'programs.html',
      'beginner-yoga.html': 'programs.html',
      'sarah-jenkins.html': 'instructors.html'
    };
    const section = sections[page.split('/').pop()];
    mount.querySelectorAll('a').forEach(link => {
      if (link.classList.contains('global-navbar__logo')) return;
      const target = new URL(link.href).pathname;
      if (target === page) link.setAttribute('aria-current', 'page');
      else if (section && target === new URL(section, base).pathname) link.classList.add('is-active');
    });

    const toggle = mount.querySelector('.global-navbar__toggle');
    const menu = mount.querySelector('.global-navbar__links');
    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!mount.contains(event.target)) setOpen(false);
    });
    mount.addEventListener('focusout', event => {
      if (!mount.contains(event.relatedTarget)) setOpen(false);
    });
    matchMedia('(max-width: 900px)').addEventListener('change', () => setOpen(false));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
