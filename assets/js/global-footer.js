(async function () {
  const mount = document.querySelector('[data-site-footer]');
  if (!mount) return;

  if (!document.querySelector('link[data-global-footer-styles]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'assets/css/global-footer.css';
    stylesheet.dataset.globalFooterStyles = '';
    document.head.appendChild(stylesheet);
  }

  try {
    const response = await fetch('global_footer.html');
    if (!response.ok) throw new Error(`Footer request failed: ${response.status}`);
    mount.outerHTML = await response.text();
  } catch (error) {
    console.error('Unable to load the global footer.', error);
    return;
  }

  const form = document.querySelector('.global-footer__newsletter');
  const status = document.querySelector('.global-footer__status');
  form?.addEventListener('submit', function (event) {
    event.preventDefault();
    const input = form.querySelector('input');
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    input.value = '';
    input.placeholder = 'Thanks for subscribing';
    status.textContent = 'You’re on the list.';
  });
})();
