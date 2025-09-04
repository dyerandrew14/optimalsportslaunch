import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Product } from '@/lib/products';

const KEY_ALL = 'products:all';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const athlete = searchParams.get('athlete') || undefined;
  const school = searchParams.get('school') || undefined;

  const all = (await kv.get<Product[]>(KEY_ALL)) || [];
  const filtered = all.filter(p => {
    if (athlete && p.athleteSlug !== athlete) return false;
    if (school && p.school !== school) return false;
    return p.active !== false;
  });
  return NextResponse.json(filtered);
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
      athleteSlug: input.athleteSlug,
      athleteName: input.athleteName,
      school: input.school,
      active: input.active ?? true,
      externalUrl: input.externalUrl,
      createdAt: now,
      updatedAt: now,
    };
    const all = (await kv.get<Product[]>(KEY_ALL)) || [];
    all.push(newProduct);
    await kv.set(KEY_ALL, all);
    await kv.set(`product:${newProduct.id}`, newProduct);
    // Secondary indexes for athlete and school for faster lookups
    await kv.zadd(`products:byAthlete:${newProduct.athleteSlug}`, { score: now, member: newProduct.id });
    await kv.zadd(`products:bySchool:${newProduct.school}`, { score: now, member: newProduct.id });
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


