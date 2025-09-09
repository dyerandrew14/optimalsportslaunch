import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { athletes as defaultAthletes, type Athlete } from '@/lib/athletes';

// In-memory fallback to keep Admin usable if KV has an issue
let memoryAthletes: Athlete[] = [...defaultAthletes];

// GET /api/athletes - Get all athletes
export async function GET() {
  try {
    // Try to get athletes from KV store
    const storedAthletes = await kv.get<Athlete[]>('athletes:all');
    console.log('KV stored athletes:', storedAthletes ? storedAthletes.length : 'null');
    
    // If no athletes in KV, use default athletes and save them
    if (!storedAthletes || storedAthletes.length === 0) {
      console.log('No athletes in KV, seeding with defaults');
      await kv.set('athletes:all', defaultAthletes);
      memoryAthletes = [...defaultAthletes];
      return NextResponse.json(defaultAthletes);
    }
    
    console.log('Returning stored athletes from KV:', storedAthletes.length);
    return NextResponse.json(storedAthletes);
  } catch (error) {
    console.error('Error fetching athletes:', error);
    console.log('Falling back to memory/default athletes');
    // Fallback to default athletes if KV fails
    return NextResponse.json(memoryAthletes.length ? memoryAthletes : defaultAthletes);
  }
}

// POST /api/athletes - Create new athlete
export async function POST(request: NextRequest) {
  // Parse body ONCE so we can use it in both success and fallback paths
  const body: Athlete = await request.json();
  console.log('Creating athlete:', body.name, 'with slug:', body.slug);
  try {
    const currentAthletes = (await kv.get<Athlete[]>('athletes:all')) || memoryAthletes || defaultAthletes;
    console.log('Current athletes count:', currentAthletes.length);
    const updatedAthletes = [...currentAthletes, body];
    console.log('Updated athletes count:', updatedAthletes.length);
    await kv.set('athletes:all', updatedAthletes);
    await kv.set(`athlete:${body.slug}`, body);
    memoryAthletes = updatedAthletes;
    console.log('Successfully saved athlete to KV');
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    console.error('Error creating athlete (fallback to memory):', error);
    memoryAthletes = [...memoryAthletes, body];
    console.log('Saved athlete to memory fallback');
    return NextResponse.json(body, { status: 201 });
  }
}

// PUT /api/athletes - Update all athletes (for bulk operations)
export async function PUT(request: NextRequest) {
  const list: Athlete[] = await request.json();
  try {
    await kv.set('athletes:all', list);
    for (const athlete of list) {
      await kv.set(`athlete:${athlete.slug}`, athlete);
    }
    memoryAthletes = list;
    return NextResponse.json(list);
  } catch (error) {
    console.error('Error updating athletes (fallback to memory):', error);
    memoryAthletes = list;
    return NextResponse.json(list);
  }
}

