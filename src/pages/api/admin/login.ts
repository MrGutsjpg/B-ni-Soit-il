import { promises as fs } from 'fs';
import path from 'path';
import { createHash } from 'crypto';

const adminFile = path.join(process.cwd(), '.admin.json');

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) return new Response('Email e senha obrigatórios', { status: 400 });

    const raw = await fs.readFile(adminFile, 'utf-8');
    const stored = JSON.parse(raw);
    const hash = createHash('sha256').update(password).digest('hex');
    if (stored.email === email && stored.passwordHash === hash) {
      // NOTE: Simple sessionless login (placeholder). In production, use proper sessions.
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response('Credenciais inválidas', { status: 401 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
