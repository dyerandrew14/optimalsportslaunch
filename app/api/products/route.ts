import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';
import { Product } from '@/lib/products';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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
  const limit = Number(searchParams.get('limit') || '50'); // Increased default limit

  let all: Product[] = [];
  try {
    all = (await kv.get(KEY_ALL)) || [];
    console.log('Products from KV:', all.length);
    
    // If we got products from KV, update memory products
    if (all.length > 0) {
      memoryProducts = all;
      console.log('Updated memory products from KV:', memoryProducts.length);
    }
  } catch (error) {
    console.log('KV error, using memory products:', error);
    all = memoryProducts;
  }
  
  // If KV is empty but we have memory products, use memory products
  if (all.length === 0 && memoryProducts.length > 0) {
    console.log('Using memory products as fallback:', memoryProducts.length);
    all = memoryProducts;
    // Try to save memory products back to KV
    try {
      await kv.set(KEY_ALL, memoryProducts);
      console.log('Saved memory products back to KV');
    } catch (e) {
      console.log('Failed to save memory products to KV:', e);
    }
  }
  
  // Only seed if we have absolutely no products anywhere
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
        athleteSlug: 'jonah-coleman',
        athleteName: 'Jonah Coleman',
        school: 'Arizona',
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
        athleteSlug: 'christian-pierce',
        athleteName: 'Christian Pierce',
        school: 'USC',
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
        athleteSlug: 'rico-flores-jr',
        athleteName: 'Rico Flores Jr.',
        school: 'Arizona',
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
  
  console.log('Products API Debug:');
  console.log('- Total products in Redis:', all.length);
  console.log('- After filtering:', filtered.length);
  console.log('- Page:', page, 'Limit:', limit);
  console.log('- Start index:', Math.max((page - 1) * limit, 0));
  console.log('- Products being returned:', filtered.slice(Math.max((page - 1) * limit, 0), Math.max((page - 1) * limit, 0) + limit).length);
  const start = Math.max((page - 1) * limit, 0);
  const paged = filtered.slice(start, start + limit);
  return NextResponse.json(paged);
}

export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    console.log('Creating product:', input.name);
    console.log('Redis connection status:', typeof kv);
    
    const now = Date.now();
    const newProduct: Product = {
      id: input.id || crypto.randomUUID(),
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
      console.log('Attempting to get existing products...');
      const all = (await kv.get(KEY_ALL)) || [];
      console.log('Existing products count:', all.length);
      
      all.push(newProduct);
      console.log('Attempting to save products to KV...');
      await kv.set(KEY_ALL, all);
      await kv.set(`product:${newProduct.id}`, newProduct);
      console.log('Successfully saved product to KV');
      
      // Also update memory products for immediate local access
      memoryProducts.push(newProduct);
      console.log('Updated memory products:', memoryProducts.length);
    } catch (redisError) {
      console.error('Redis error:', redisError);
      // Fallback: add to memory products and return the product
      memoryProducts.push(newProduct);
      console.log('Added to memory products as fallback:', memoryProducts.length);
    }
    return NextResponse.json(newProduct, { status: 201 });
  } catch (e) {
    console.error('Error creating product:', e);
    console.error('Error details:', e instanceof Error ? e.message : 'Unknown error');
    return NextResponse.json({ error: 'Failed to create product', details: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Optional bulk replace
  const products: Product[] = await request.json();
  await kv.set(KEY_ALL, products);
  memoryProducts = products; // Update memory products too
  return NextResponse.json(products);
}

// Debug endpoint to check what's in Redis
export async function DELETE(request: NextRequest) {
  try {
    const all = await kv.get(KEY_ALL) || [];
    console.log('DEBUG: Products in Redis:', all.length);
    console.log('DEBUG: Memory products:', memoryProducts.length);
    return NextResponse.json({ 
      redisCount: all.length, 
      memoryCount: memoryProducts.length,
      redisProducts: all.map((p: any) => ({ id: p.id, name: p.name, active: p.active })),
      memoryProducts: memoryProducts.map((p: any) => ({ id: p.id, name: p.name, active: p.active }))
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


