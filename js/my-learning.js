import { supabase } from './supabase.js';

const PROJECTS = {
  logiclab: 'LogicLab',
  cprogramming: 'C Programming Hub',
  microhub: 'Microcontroller Hub',
  python: 'Python for Students'
};

const PROJECT_URLS = {
  LogicLab: 'https://shyam2010-py.github.io/LogicLab/',
  'C Programming Hub': 'https://shyam2010-py.github.io/c-programming-hub/',
  'Microcontroller Hub': 'https://shyam2010-py.github.io/microcontroller-hub/',
  'Python for Students': 'https://shyam2010-py.github.io/python-for-students/',
  'ECE Toolkit': 'https://shyam2010-py.github.io/ece-toolkit/',
  PocketPilot: 'https://shyam2010-py.github.io/StudentBudgetTracker/',
  'Attendance Tracker': 'https://shyam2010-py.github.io/Attendance-Tracker/',
  Portfolio: 'https://shyam2010-py.github.io/Portfolio/'
};

const $ = id => document.getElementById(id);

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recently';
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

async function init() {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;
  if (!user) {
    const notice = $('authNotice');
    notice.hidden = false;
    notice.innerHTML = '<h2>Sign in to view your learning</h2><p class="empty">Your personal progress and activity are available after signing in.</p><a class="btn btn-primary" href="./auth.html">Sign in →</a>';
    return;
  }

  $('dashboard').hidden = false;

  const { data: summary } = await supabase.rpc('get_my_learning_summary');
  const stats = summary?.[0];
  if (stats) {
    $('averageProgress').textContent = `${Number(stats.average_progress || 0)}%`;
    $('visitCount').textContent = String(stats.project_visit_count || 0);
    $('trackedCount').textContent = String(stats.tracked_project_count || 0);
  }

  const { data: progress } = await supabase.from('learning_progress').select('project_key, percent').eq('user_id', user.id).order('project_key');
  const progressRows = Object.entries(PROJECTS).map(([key, label]) => {
    const row = (progress || []).find(item => item.project_key === key);
    return { label, percent: Math.max(0, Math.min(100, Number(row?.percent) || 0)) };
  });
  $('progressList').innerHTML = progressRows.map(row => `<div class="progress-row"><div><b>${row.label}</b><div class="bar"><i style="width:${row.percent}%"></i></div></div><div class="progress-value">${row.percent}%</div></div>`).join('');

  const { data: visits } = await supabase.from('project_visits').select('project_key, visited_at').eq('user_id', user.id).order('visited_at', { ascending: false }).limit(10);
  $('activityList').innerHTML = visits?.length ? visits.map(row => `<div class="activity-row"><div><b>${row.project_key}</b><small>Project opened</small></div><small>${formatTime(row.visited_at)}</small></div>`).join('') : '<p class="empty">No project activity yet. Open a project from LearningHub and it will appear here.</p>';
}

init().catch(error => console.warn('[LearningHub] My Learning failed:', error));
