import { promises as fs } from 'fs';
import path from 'path';
import { createHash } from 'crypto';

const adminFile = path.join(process.cwd(), '.admin.json');

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) return new Response('Email e senha obrigatórios', { status: 400 });

    // check if admin already exists
    try {
      await fs.stat(adminFile);
      return new Response('Admin já existe', { status: 409 });
    } catch (e) {
      // file does not exist -> continue
    }

    const hash = createHash('sha256').update(password).digest('hex');
    const data = { email, passwordHash: hash, createdAt: new Date().toISOString() };
    await fs.writeFile(adminFile, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
