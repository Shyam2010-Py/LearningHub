import { supabase } from './supabase.js';

const $ = (id) => document.getElementById(id);
const authForm = $('authForm');
const resetForm = $('resetForm');
const loginTab = $('loginTab');
const signupTab = $('signupTab');
const nameField = $('nameField');
const displayName = $('displayName');
const email = $('email');
const password = $('password');
const authSubmit = $('authSubmit');
const forgotButton = $('forgotButton');
const resetPanel = $('resetPanel');
const resetEmail = $('resetEmail');
const cancelReset = $('cancelReset');
const message = $('authMessage');
const title = $('authTitle');
const subtitle = $('authSubtitle');

let mode = new URLSearchParams(window.location.search).get('mode') === 'signup' ? 'signup' : 'login';

function setMessage(text, type = '') {
  message.textContent = text;
  message.className = `auth-message ${type}`.trim();
}

function setMode(nextMode) {
  mode = nextMode;
  const signup = mode === 'signup';
  loginTab.classList.toggle('active', !signup);
  signupTab.classList.toggle('active', signup);
  loginTab.setAttribute('aria-selected', String(!signup));
  signupTab.setAttribute('aria-selected', String(signup));
  nameField.hidden = !signup;
  displayName.required = signup;
  password.autocomplete = signup ? 'new-password' : 'current-password';
  authSubmit.textContent = signup ? 'Create account' : 'Sign in';
  title.textContent = signup ? 'Create your account.' : 'Welcome back.';
  subtitle.textContent = signup
    ? 'Create an account to keep your LearningHub progress and activity with you.'
    : 'Sign in to keep your learning progress and activity with your account.';
  forgotButton.hidden = signup;
  setMessage('');
}

loginTab.addEventListener('click', () => setMode('login'));
signupTab.addEventListener('click', () => setMode('signup'));

forgotButton.addEventListener('click', () => {
  resetPanel.hidden = false;
  resetEmail.value = email.value.trim();
  resetEmail.focus();
  setMessage('');
});

cancelReset.addEventListener('click', () => {
  resetPanel.hidden = true;
  email.focus();
});

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  setMessage('');
  authSubmit.disabled = true;
  authSubmit.textContent = mode === 'signup' ? 'Creating…' : 'Signing in…';

  try {
    const emailValue = email.value.trim();
    const passwordValue = password.value;

    if (mode === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email: emailValue,
        password: passwordValue,
        options: {
          data: { display_name: displayName.value.trim() },
          emailRedirectTo: new URL('./auth.html', window.location.href).href
        }
      });
      if (error) throw error;

      if (data.session) {
        window.location.href = './';
        return;
      }

      setMessage('Account created. Check your email to verify the account before signing in.', 'success');
      authForm.reset();
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailValue,
        password: passwordValue
      });
      if (error) throw error;
      window.location.href = './';
    }
  } catch (error) {
    setMessage(error?.message || 'Unable to complete the request. Please try again.', 'error');
  } finally {
    authSubmit.disabled = false;
    authSubmit.textContent = mode === 'signup' ? 'Create account' : 'Sign in';
  }
});

resetForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  setMessage('');
  const button = resetForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Sending…';

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.value.trim(), {
      redirectTo: new URL('./auth.html?mode=reset', window.location.href).href
    });
    if (error) throw error;
    setMessage('If an account exists for that email, a reset link has been sent.', 'success');
    resetPanel.hidden = true;
  } catch (error) {
    setMessage(error?.message || 'Unable to send the reset link.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Send reset link';
  }
});

async function handleRecoverySession() {
  const { data } = await supabase.auth.getSession();
  if (data.session && new URLSearchParams(window.location.search).get('mode') === 'reset') {
    title.textContent = 'Choose a new password.';
    subtitle.textContent = 'Set a new password for your LearningHub account.';
    resetPanel.hidden = true;
    forgotButton.hidden = true;
    setMode('login');
    password.required = true;
    password.autocomplete = 'new-password';
    authSubmit.textContent = 'Update password';
    authForm.onsubmit = async (event) => {
      event.preventDefault();
      authSubmit.disabled = true;
      try {
        const { error } = await supabase.auth.updateUser({ password: password.value });
        if (error) throw error;
        setMessage('Password updated. Returning to LearningHub…', 'success');
        setTimeout(() => { window.location.href = './'; }, 900);
      } catch (error) {
        setMessage(error?.message || 'Unable to update your password.', 'error');
      } finally {
        authSubmit.disabled = false;
      }
    };
  }
}

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' && mode === 'login' && !window.location.search.includes('mode=reset')) {
    window.location.href = './';
  }
});

setMode(mode);
handleRecoverySession();
