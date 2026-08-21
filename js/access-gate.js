import { supabase } from './supabase.js';

const PROJECT_HOST = 'shyam2010-py.github.io';
const PROJECT_PATHS = new Set([
  '/LogicLab/',
  '/ece-toolkit/',
  '/microcontroller-hub/',
  '/c-programming-hub/',
  '/python-for-students/'
]);

function isProtectedProject(url) {
  return url.protocol === 'https:' && url.hostname === PROJECT_HOST && PROJECT_PATHS.has(url.pathname);
}

async function handleProjectClick(event) {
  const link = event.currentTarget;
  const url = new URL(link.href);
  if (!isProtectedProject(url)) return;

  event.preventDefault();
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    window.open(url.href, '_blank', 'noopener');
    return;
  }

  const next = encodeURIComponent(url.href);
  window.location.href = `./auth.html?next=${next}`;
}

document.querySelectorAll('a[href]').forEach(link => {
  try {
    if (isProtectedProject(new URL(link.href, window.location.href))) {
      link.addEventListener('click', handleProjectClick);
    }
  } catch (_) {}
});
