import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://eqplsewompiudxibowrz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_fXOaWHOBJ0ByF8L2LF389Q_4gHjstsp';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
