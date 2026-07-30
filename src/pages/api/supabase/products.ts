import { supabaseServer } from '../../../lib/supabaseServer';

const ADMIN_HEADER = 'x-admin-token';

function unauthorized() {
  return new Response('Unauthorized', { status: 401 });
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer.from('products').select('*').order('id', { ascending: true });
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
    const { data, error } = await supabaseServer.from('products').insert(body).select();
    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

export async function PUT({ request }) {
  const token = request.headers.get(ADMIN_HEADER) || '';
  if (token !== process.env.ADMIN_TOKEN) return unauthorized();
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) return new Response('Missing id', { status: 400 });
    const { data, error } = await supabaseServer.from('products').update(rest).eq('id', id).select();
    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

export async function DELETE({ request }) {
  const token = request.headers.get(ADMIN_HEADER) || '';
  if (token !== process.env.ADMIN_TOKEN) return unauthorized();
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return new Response('Missing id', { status: 400 });
    const { error } = await supabaseServer.from('products').delete().eq('id', id);
    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
