import { promises as fs } from 'fs';
import path from 'path';
import { notifyOrder } from '../../lib/notify';

const ordersFile = path.join(process.cwd(), 'orders.json');

export async function POST({ request }) {
  try {
    const body = await request.json();
    const order = { ...body, createdAt: new Date().toISOString() };

    // append to orders.json (create if not exist)
    let arr = [];
    try {
      const raw = await fs.readFile(ordersFile, 'utf-8');
      arr = JSON.parse(raw);
    } catch (e) {
      // ignore if file doesn't exist
    }
    arr.push(order);
    await fs.writeFile(ordersFile, JSON.stringify(arr, null, 2), 'utf-8');

    // notifications (webhook and/or email) — best-effort
    try {
      await notifyOrder(order);
    } catch (e) {
      console.warn('Notify failed', e);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
