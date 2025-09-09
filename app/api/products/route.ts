import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Product } from '@/lib/products';
import fs from 'fs';
import path from 'path';

const KEY_ALL = 'products:all';
let memoryProducts: Product[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const athlete = searchParams.get('athlete') || undefined;
  const school = searchParams.get('school') || undefined;
  const name = searchParams.get('name')?.toLowerCase() || undefined;
  const category = searchParams.get('category')?.toLowerCase() || undefined;
  const size = searchParams.get('size')?.toLowerCase() || undefined;
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '8');

  let all: Product[] = [];
  try {
    all = (await kv.get<Product[]>(KEY_ALL)) || [];
  } catch {
    all = memoryProducts;
  }
  if (all.length === 0) {
    const now = Date.now();
    // Seed exactly three products based on the current catalog
    all = [
      {
        id: 'man-tee',
        name: 'Optimal Man Tee',
        price: 49,
        imageUrl: '/catalog/mens-classic-tee-black-front-6616e04f63957_540x.webp',
        images: ['/catalog/mens-classic-tee-black-front-6616e04f63957_540x.webp','/catalog/mens-classic-tee-black-left-6616e04f64dee_540x.webp','/catalog/mens-classic-tee-black-right-6616e04f6534e_540x.webp','/catalog/mens-classic-tee-black-back-62b588dcdd3e6_540x.webp'],
        athleteSlug: '',
        athleteName: '',
        school: '',
        categories: ['Tees'],
        sizes: ['S','M','L','XL'],
        inventoryBySize: { S: 10, M: 10, L: 10, XL: 10 },
        active: true,
        createdAt: now,
        updatedAt: now,
      } as Product,
      {
        id: 'man-hoodie',
        name: 'Optimal Man Hoodie',
        price: 79,
        imageUrl: '/catalog/unisex-premium-hoodie-black-front-62b584b06d8bc_540x.webp',
        images: ['/catalog/unisex-premium-hoodie-black-front-62b584b06d8bc_540x.webp'],
        athleteSlug: '',
        athleteName: '',
        school: '',
        categories: ['Hoodies'],
        sizes: ['S','M','L','XL'],
        inventoryBySize: { S: 8, M: 12, L: 10, XL: 6 },
        active: true,
        createdAt: now,
        updatedAt: now,
      } as Product,
      {
        id: 'flag-tee',
        name: 'Optimal Flag Tee',
        price: 49,
        imageUrl: '/catalog/mens-classic-tee-black-front-62b588dcdd26d_540x.webp',
        images: ['/catalog/mens-classic-tee-black-front-62b588dcdd26d_540x.webp'],
        athleteSlug: '',
        athleteName: '',
        school: '',
        categories: ['Tees'],
        sizes: ['S','M','L','XL'],
        inventoryBySize: { S: 10, M: 10, L: 10, XL: 10 },
        active: true,
        createdAt: now,
        updatedAt: now,
      } as Product,
    ];
    memoryProducts = all;
    try {
      await kv.set(KEY_ALL, all);
      for (const p of all) await kv.set(`product:${p.id}`, p);
    } catch {}
  }
  const filtered = all.filter(p => {
    if (athlete && p.athleteSlug !== athlete) return false;
    if (school && p.school !== school) return false;
    if (name && !(`${p.name}`.toLowerCase().includes(name) || `${p.athleteName}`.toLowerCase().includes(name))) return false;
    if (category && !(p.categories || []).some(c => c.toLowerCase() === category)) return false;
    if (size && !(p.sizes || []).some(s => s.toLowerCase() === size)) return false;
    return p.active !== false;
  });
  const start = Math.max((page - 1) * limit, 0);
  const paged = filtered.slice(start, start + limit);
  return NextResponse.json(paged);
}

export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    const now = Date.now();
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: input.name,
      price: Number(input.price),
      imageUrl: input.imageUrl,
      images: input.images ?? (input.imageUrl ? [input.imageUrl] : []),
      athleteSlug: input.athleteSlug,
      athleteName: input.athleteName,
      school: input.school,
      categories: input.categories ?? [],
      sizes: input.sizes ?? [],
      inventoryBySize: input.inventoryBySize ?? {},
      active: input.active ?? true,
      externalUrl: input.externalUrl,
      createdAt: now,
      updatedAt: now,
    };
    try {
      const all = (await kv.get<Product[]>(KEY_ALL)) || [];
      all.push(newProduct);
      await kv.set(KEY_ALL, all);
      await kv.set(`product:${newProduct.id}`, newProduct);
      await kv.zadd(`products:byAthlete:${newProduct.athleteSlug}`, { score: now, member: newProduct.id });
      await kv.zadd(`products:bySchool:${newProduct.school}`, { score: now, member: newProduct.id });
    } catch {
      memoryProducts = [newProduct, ...memoryProducts];
    }
    return NextResponse.json(newProduct, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Optional bulk replace
  const products: Product[] = await request.json();
  await kv.set(KEY_ALL, products);
  return NextResponse.json(products);
}


