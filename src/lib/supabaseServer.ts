import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_KEY || '';

// Create server client only when env vars are provided. During static builds
// these are often missing; export a safe stub to avoid runtime errors.
export const supabaseServer = (url && serviceKey)
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : {
      from: () => ({
        select: async () => ({ data: [], error: null }),
        order: async () => ({ data: [], error: null }),
        insert: async () => ({ data: [], error: null }),
        update: async () => ({ data: [], error: null }),
        delete: async () => ({ data: [], error: null }),
      }),
      auth: {},
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: null }),
          download: async () => ({ data: null, error: null }),
        }),
      },
    };
