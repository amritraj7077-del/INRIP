import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('=== SUPABASE CONFIGURATION DEBUG ===');
console.log('Original VITE_SUPABASE_URL:', supabaseUrl);
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'N/A');
console.log('supabaseUrl type:', typeof supabaseUrl);
console.log('supabaseAnonKey type:', typeof supabaseAnonKey);

// Check if the anon key is in a valid format
// Supports both legacy JWT keys (starting with "eyJ") and new publishable keys (starting with "sb_publishable_")
let isValidKey = true;
if (supabaseAnonKey) {
  const isLegacyKey = supabaseAnonKey.startsWith('eyJ');
  const isPublishableKey = supabaseAnonKey.startsWith('sb_publishable_');
  
  if (!isLegacyKey && !isPublishableKey) {
    console.error('❌ ERROR: VITE_SUPABASE_ANON_KEY is not a valid Supabase key');
    console.error('Valid key formats:');
    console.error('  - Legacy JWT anon keys (start with "eyJ")');
    console.error('  - New publishable keys (start with "sb_publishable_")');
    console.error('Your key starts with:', supabaseAnonKey.substring(0, 20));
    console.error('Please get a valid key from: https://supabase.com/dashboard/project/_/settings/api');
    isValidKey = false;
  } else {
    console.log('✓ Valid Supabase key format detected:', isLegacyKey ? 'Legacy JWT' : 'Publishable');
  }
}

// Fix: Remove /rest/v1/ suffix if present (Supabase client adds it automatically)
if (supabaseUrl && supabaseUrl.endsWith('/rest/v1/')) {
  console.warn('⚠ WARNING: VITE_SUPABASE_URL contains /rest/v1/ suffix. Removing it.');
  supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '');
  console.log('Corrected VITE_SUPABASE_URL:', supabaseUrl);
}

if (supabaseUrl && supabaseUrl.endsWith('/rest/v1')) {
  console.warn('⚠ WARNING: VITE_SUPABASE_URL contains /rest/v1 suffix. Removing it.');
  supabaseUrl = supabaseUrl.replace(/\/rest\/v1$/, '');
  console.log('Corrected VITE_SUPABASE_URL:', supabaseUrl);
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Supabase environment variables not set');
  console.error('supabaseUrl is null/undefined:', !supabaseUrl);
  console.error('supabaseAnonKey is null/undefined:', !supabaseAnonKey);
}

// Create Supabase client (with null if invalid)
export const supabase = (supabaseUrl && supabaseAnonKey && isValidKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!supabase;

console.log('Supabase client created:', !!supabase);
console.log('isSupabaseConfigured:', isSupabaseConfigured);
