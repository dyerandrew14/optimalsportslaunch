import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Product } from '@/lib/products';

const KEY_ALL = 'products:all';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const input = await request.json();
  const all = (await kv.get<Product[]>(KEY_ALL)) || [];
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const updated: Product = { ...all[idx], ...input, updatedAt: Date.now() };
  all[idx] = updated;
  await kv.set(KEY_ALL, all);
  await kv.set(`product:${id}`, updated);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const all = (await kv.get<Product[]>(KEY_ALL)) || [];
  const next = all.filter(p => p.id !== id);
  if (next.length === all.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await kv.set(KEY_ALL, next);
  await kv.del(`product:${id}`);
  return NextResponse.json({ ok: true });
}


