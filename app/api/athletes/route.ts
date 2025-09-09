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
    
    // If no athletes in KV, use default athletes and save them
    if (!storedAthletes) {
      await kv.set('athletes:all', defaultAthletes);
      memoryAthletes = [...defaultAthletes];
      return NextResponse.json(defaultAthletes);
    }
    
    return NextResponse.json(storedAthletes);
  } catch (error) {
    console.error('Error fetching athletes:', error);
    // Fallback to default athletes if KV fails
    return NextResponse.json(memoryAthletes.length ? memoryAthletes : defaultAthletes);
  }
}

// POST /api/athletes - Create new athlete
export async function POST(request: NextRequest) {
  // Parse body ONCE so we can use it in both success and fallback paths
  const body: Athlete = await request.json();
  try {
    const currentAthletes = (await kv.get<Athlete[]>('athletes:all')) || memoryAthletes || defaultAthletes;
    const updatedAthletes = [...currentAthletes, body];
    await kv.set('athletes:all', updatedAthletes);
    await kv.set(`athlete:${body.slug}`, body);
    memoryAthletes = updatedAthletes;
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    console.error('Error creating athlete (fallback to memory):', error);
    memoryAthletes = [...memoryAthletes, body];
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

