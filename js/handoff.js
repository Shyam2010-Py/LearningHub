/* LearningHub -> standalone learning-project handoff */
(function () {
  'use strict';

  const PROJECTS = {
    logiclab: 'https://shyam2010-py.github.io/LogicLab/',
    ece: 'https://shyam2010-py.github.io/ece-toolkit/',
    micro: 'https://shyam2010-py.github.io/microcontroller-hub/',
    c: 'https://shyam2010-py.github.io/c-programming-hub/',
    python: 'https://shyam2010-py.github.io/python-for-students/'
  };

  const TARGETS = new Map([
    [PROJECTS.logiclab, 'logiclab'],
    [PROJECTS.ece, 'ece-toolkit'],
    [PROJECTS.micro, 'microcontroller-hub'],
    [PROJECTS.c, 'c-programming-hub'],
    [PROJECTS.python, 'python-for-students']
  ]);

  async function createHandoff(projectKey) {
    const { supabase } = await import('./supabase.js');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    const response = await fetch('https://eqplsewompiudxibowrz.supabase.co/functions/v1/create-learning-handoff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ target_project: projectKey })
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.code || null;
  }

  document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');
    if (!link || !link.href || link.target !== '_blank') return;
    const projectKey = TARGETS.get(link.href.replace(/\/$/, '') + '/');
    if (!projectKey) return;
    event.preventDefault();
    try {
      const code = await createHandoff(projectKey);
      if (code) {
        const target = new URL(link.href);
        target.searchParams.set('lh_code', code);
        window.open(target.href, '_blank', 'noopener');
      } else {
        window.open(link.href, '_blank', 'noopener');
      }
    } catch (error) {
      console.warn('[LearningHub] Handoff failed:', error);
      window.open(link.href, '_blank', 'noopener');
    }
  }, true);
})();
