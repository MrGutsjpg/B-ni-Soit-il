import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

// Create real client only when env vars are present. During static build
// these may be absent, so export a safe stub to avoid build-time crashes.
export const supabase = (supabaseUrl && supabaseAnonKey)
	? createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: true } })
	: {
			auth: {
				getSession: async () => ({ data: { session: null } }),
				onAuthStateChange: () => ({ data: null }),
			},
			from: () => ({
				insert: async () => ({ data: null, error: null }),
				select: async () => ({ data: null, error: null }),
				update: async () => ({ data: null, error: null }),
				delete: async () => ({ data: null, error: null }),
			}),
		};
