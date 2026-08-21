/* ============================================
   LearningHub — Activity tracking + Recent Activity
   Phase 2B
   ============================================ */
(function () {
  'use strict';

  const PROJECTS = {
    LogicLab: 'https://shyam2010-py.github.io/LogicLab/',
    'ECE Toolkit': 'https://shyam2010-py.github.io/ece-toolkit/',
    'Microcontroller Hub': 'https://shyam2010-py.github.io/microcontroller-hub/',
    'C Programming Hub': 'https://shyam2010-py.github.io/c-programming-hub/',
    'Python for Students': 'https://shyam2010-py.github.io/python-for-students/',
    PocketPilot: 'https://shyam2010-py.github.io/StudentBudgetTracker/',
    'Attendance Tracker': 'https://shyam2010-py.github.io/Attendance-Tracker/',
    Portfolio: 'https://shyam2010-py.github.io/Portfolio/'
  };

  const PATH_TO_PROJECT = {
    LogicLab: 'LogicLab',
    'ece-toolkit': 'ECE Toolkit',
    'microcontroller-hub': 'Microcontroller Hub',
    'c-programming-hub': 'C Programming Hub',
    'python-for-students': 'Python for Students',
    StudentBudgetTracker: 'PocketPilot',
    'Attendance-Tracker': 'Attendance Tracker',
    Portfolio: 'Portfolio'
  };

  let supabase = null;
  let user = null;

  function injectStyles() {
    if (document.getElementById('lh-activity-styles')) return;
    const style = document.createElement('style');
    style.id = 'lh-activity-styles';
    style.textContent = `
      .lh-activity{margin-top:28px;border:1px solid var(--line);border-radius:20px;background:var(--panel);padding:20px 22px}
      .lh-activity-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:14px}
      .lh-activity-head h3{margin:0;font-size:1.05rem}.lh-activity-head span{color:var(--muted);font-size:.82rem}
      .lh-activity-list{display:grid;gap:8px}.lh-activity-item{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0;border-top:1px solid var(--line)}
      .lh-activity-item:first-child{border-top:0}.lh-activity-item b{font-size:.94rem}.lh-activity-item small{display:block;color:var(--muted);margin-top:3px}.lh-activity-empty{color:var(--muted);margin:0;font-size:.9rem}
      .lh-activity-link{color:var(--accent);text-decoration:none;font-size:.85rem;white-space:nowrap}.lh-activity-link:hover{color:var(--accent-2)}
      @media(max-width:560px){.lh-activity{padding:16px}.lh-activity-item{align-items:flex-start}.lh-activity-link{font-size:.78rem}}
    `;
    document.head.appendChild(style);
  }

  function getProjectFromLink(link) {
    try {
      const url = new URL(link.href);
      if (url.origin !== 'https://shyam2010-py.github.io') return null;
      const segment = url.pathname.replace(/^\/+|\/+$/g, '').split('/')[0];
      return PATH_TO_PROJECT[segment] || null;
    } catch (_) {
      return null;
    }
  }

  function formatTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Recently';
    const diff = Date.now() - date.getTime();
    if (diff < 60 * 1000) return 'Just now';
    if (diff < 60 * 60 * 1000) return `${Math.max(1, Math.floor(diff / 60000))} min ago`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.max(1, Math.floor(diff / 3600000))} hr ago`;
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }

  async function logProjectVisit(projectKey) {
    if (!user || !projectKey || !supabase) return;
    try {
      await supabase.from('project_visits').insert({ user_id: user.id, project_key: projectKey });
      await supabase.from('activity_events').insert({
        user_id: user.id,
        event_type: 'project_open',
        project_key: projectKey,
        page_path: window.location.pathname
      });
    } catch (error) {
      console.warn('[LearningHub] Activity tracking failed:', error);
    }
  }

  async function renderRecentActivity() {
    if (!user || !supabase) return;
    const existing = document.getElementById('recentActivity');
    if (existing) existing.remove();

    let rows = [];
    try {
      const { data, error } = await supabase
        .from('project_visits')
        .select('project_key, visited_at')
        .eq('user_id', user.id)
        .order('visited_at', { ascending: false })
        .limit(6);
      if (error) throw error;
      rows = data || [];
    } catch (error) {
      console.warn('[LearningHub] Could not load recent activity:', error);
      return;
    }

    injectStyles();
    const section = document.createElement('section');
    section.id = 'recentActivity';
    section.className = 'lh-activity';
    const items = rows.length ? rows.map(row => {
      const project = row.project_key || 'Project';
      const href = PROJECTS[project] || '#projects';
      return `<div class="lh-activity-item"><div><b>${project}</b><small>Opened · ${formatTime(row.visited_at)}</small></div><a class="lh-activity-link" href="${href}" target="_blank" rel="noopener">Open →</a></div>`;
    }).join('') : '<p class="lh-activity-empty">No project activity yet. Open a project and it will appear here.</p>';
    section.innerHTML = `<div class="lh-activity-head"><h3>Recent Activity</h3><span>Your account history</span></div><div class="lh-activity-list">${items}</div>`;

    const updates = document.getElementById('updates');
    if (updates?.parentNode) updates.parentNode.insertBefore(section, updates);
  }

  async function init() {
    try {
      const module = await import('./supabase.js');
      supabase = module.supabase;
      const { data } = await supabase.auth.getSession();
      user = data.session?.user || null;
      if (!user) return;

      document.querySelectorAll('a[href^="https://shyam2010-py.github.io/"]').forEach(link => {
        const projectKey = getProjectFromLink(link);
        if (!projectKey || link.dataset.activityBound === '1') return;
        link.dataset.activityBound = '1';
        link.addEventListener('click', () => { logProjectVisit(projectKey); });
      });

      await renderRecentActivity();
    } catch (error) {
      console.warn('[LearningHub] Activity module failed to initialize:', error);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
