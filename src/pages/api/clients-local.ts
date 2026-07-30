import { promises as fs } from 'fs';
import path from 'path';

const clientsFile = path.join(process.cwd(), 'clients.json');

export async function GET() {
  try {
    let arr = [];
    try {
      const raw = await fs.readFile(clientsFile, 'utf-8');
      arr = JSON.parse(raw);
    } catch (e) {
      // file may not exist
    }
    return new Response(JSON.stringify(arr), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    let arr = [];
    try {
      const raw = await fs.readFile(clientsFile, 'utf-8');
      arr = JSON.parse(raw);
    } catch (e) {}
    const id = (arr.length ? arr[arr.length-1].id + 1 : 1);
    const entry = { id, ...body, created_at: new Date().toISOString() };
    arr.push(entry);
    await fs.writeFile(clientsFile, JSON.stringify(arr, null, 2), 'utf-8');
    return new Response(JSON.stringify(entry), { status: 201 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

export async function PUT({ request }) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) return new Response('Missing id', { status: 400 });
    let arr = [];
    try {
      const raw = await fs.readFile(clientsFile, 'utf-8');
      arr = JSON.parse(raw);
    } catch (e) {}
    const idx = arr.findIndex(c => c.id === id || String(c.id) === String(id));
    if (idx === -1) return new Response('Not found', { status: 404 });
    arr[idx] = { ...arr[idx], ...rest };
    await fs.writeFile(clientsFile, JSON.stringify(arr, null, 2), 'utf-8');
    return new Response(JSON.stringify(arr[idx]), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

export async function DELETE({ request }) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return new Response('Missing id', { status: 400 });
    let arr = [];
    try {
      const raw = await fs.readFile(clientsFile, 'utf-8');
      arr = JSON.parse(raw);
    } catch (e) {}
    const filtered = arr.filter(c => !(c.id === id || String(c.id) === String(id)));
    await fs.writeFile(clientsFile, JSON.stringify(filtered, null, 2), 'utf-8');
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
