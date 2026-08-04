/* ==========================================================================
   Student Hub Bridge for LogicLab
   Injects Student Hub top bar + footer into every LogicLab page
   ========================================================================== */
(function () {
  'use strict';

  const HUB_PATH = '../../'; // from /modules/logic-lab/ up to root
  const MODULE_NAME = 'Logic Lab';
  const MODULE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>`;

  function buildHubBar() {
    const bar = document.createElement('div');
    bar.className = 'hub-bar';
    bar.setAttribute('role', 'navigation');
    bar.setAttribute('aria-label', 'Student Hub');
    bar.innerHTML = `
      <div class="hub-bar-left">
        <span class="hub-bar-logo" aria-hidden="true">SH</span>
        <span class="hub-bar-title">Student <span class="accent">Hub</span></span>
        <span class="hub-bar-divider" aria-hidden="true">/</span>
        <span class="hub-bar-module">${MODULE_NAME}</span>
      </div>
      <a href="${HUB_PATH}" class="hub-bar-link" aria-label="Back to Student Hub">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back to Hub</span>
      </a>
    `;
    return bar;
  }

  function buildHubFooter() {
    const f = document.createElement('footer');
    f.className = 'hub-footer';
    f.setAttribute('role', 'contentinfo');
    f.innerHTML = `
      <div class="hub-footer-inner">
        <div class="hub-footer-grid">
          <div>
            <div class="hub-footer-brand">
              <span>Student <span class="accent">Hub</span></span>
            </div>
            <p class="hub-footer-desc">One platform for every student need. Built with care by Ghanashyam Pabbuleti.</p>
          </div>
          <div class="hub-footer-col">
            <h5>Modules</h5>
            <ul>
              <li><a href="${HUB_PATH}modules/portfolio/">Portfolio</a></li>
              <li><a href="${HUB_PATH}modules/logic-lab/">Logic Lab</a></li>
              <li><a href="${HUB_PATH}#modules">All modules</a></li>
            </ul>
          </div>
          <div class="hub-footer-col">
            <h5>Connect</h5>
            <ul>
              <li><a href="mailto:ghanashyampabbuleti7@gmail.com">Email</a></li>
              <li><a href="https://github.com/Shyam2010-Py" target="_blank" rel="noopener">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/ghanashyam-pabbuleti-096781413" target="_blank" rel="noopener">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div class="hub-footer-bottom">
          <span>© Student Hub · v1.1.0</span>
          <span>Module: Logic Lab · Digital Electronics</span>
        </div>
      </div>
    `;
    return f;
  }

  function inject() {
    // Insert hub bar at the very top of body
    if (document.body && !document.querySelector('.hub-bar')) {
      const bar = buildHubBar();
      document.body.insertBefore(bar, document.body.firstChild);
    }

    // Insert hub footer at end of body
    if (document.body && !document.querySelector('.hub-footer')) {
      const footer = buildHubFooter();
      document.body.appendChild(footer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
