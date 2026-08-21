/* LearningHub -> standalone learning-project handoff */
(function () {
  'use strict';

  const TARGETS = new Map([
    ['https://shyam2010-py.github.io/LogicLab/', 'logiclab'],
    ['https://shyam2010-py.github.io/ece-toolkit/', 'ece-toolkit'],
    ['https://shyam2010-py.github.io/microcontroller-hub/', 'microcontroller-hub'],
    ['https://shyam2010-py.github.io/c-programming-hub/', 'c-programming-hub'],
    ['https://shyam2010-py.github.io/python-for-students/', 'python-for-students']
  ]);

  async function createHandoff(projectKey) {
    const { supabase } = await import('./supabase.js');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    const response = await fetch('https://eqplsewompiudxibowrz.supabase.co/functions/v1/create-learning-handoff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ project_key: projectKey })
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.code || null;
  }

  document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');
    if (!link || !link.href || link.target !== '_blank') return;
    const normalized = link.href.replace(/\/$/, '') + '/';
    const projectKey = TARGETS.get(normalized);
    if (!projectKey || link.dataset.handoffBound === '1') return;
    link.dataset.handoffBound = '1';
    event.preventDefault();
    try {
      const code = await createHandoff(projectKey);
      const target = new URL(link.href);
      if (code) target.searchParams.set('lh', code);
      window.open(target.href, '_blank', 'noopener');
    } catch (error) {
      console.warn('[LearningHub] Handoff failed:', error);
      window.open(link.href, '_blank', 'noopener');
    }
  }, true);
})();
