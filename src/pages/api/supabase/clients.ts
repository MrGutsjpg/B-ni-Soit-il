import { supabaseServer } from '../../../lib/supabaseServer';

const ADMIN_HEADER = 'x-admin-token';

function unauthorized() {
  return new Response('Unauthorized', { status: 401 });
}

export async function GET({ request }) {
  const token = request.headers.get(ADMIN_HEADER) || '';
  if (token !== process.env.ADMIN_TOKEN) return unauthorized();
  try {
    const { data, error } = await supabaseServer.from('clients').select('*').order('created_at', { ascending: false });
    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

export async function POST({ request }) {
  const token = request.headers.get(ADMIN_HEADER) || '';
  if (token !== process.env.ADMIN_TOKEN) return unauthorized();
  try {
    const body = await request.json();
    const { data, error } = await supabaseServer.from('clients').insert(body).select();
    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
