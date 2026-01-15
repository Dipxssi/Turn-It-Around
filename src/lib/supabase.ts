import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
function validateSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    const errorMessage = 
      'Supabase environment variables are not set. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.\n' +
      'See SUPABASE_SETUP.md for setup instructions.';
    
    if (typeof window !== 'undefined') {
      console.error(errorMessage);
    } else {
      console.warn(errorMessage);
    }
    return false;
  }
  return true;
}

// Create a single supabase client for interacting with your database
// Use a placeholder client if config is invalid to prevent runtime errors
const isValidConfig = validateSupabaseConfig();
export const supabase: SupabaseClient = isValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    );
