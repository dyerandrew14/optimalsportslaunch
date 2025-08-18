import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { athletes as defaultAthletes, type Athlete } from '@/lib/athletes';

// GET /api/athletes - Get all athletes
export async function GET() {
  try {
    // Try to get athletes from KV store
    const storedAthletes = await kv.get<Athlete[]>('athletes:all');
    
    // If no athletes in KV, use default athletes and save them
    if (!storedAthletes) {
      await kv.set('athletes:all', defaultAthletes);
      return NextResponse.json(defaultAthletes);
    }
    
    return NextResponse.json(storedAthletes);
  } catch (error) {
    console.error('Error fetching athletes:', error);
    // Fallback to default athletes if KV fails
    return NextResponse.json(defaultAthletes);
  }
}

// POST /api/athletes - Create new athlete
export async function POST(request: NextRequest) {
  try {
    const newAthlete: Athlete = await request.json();
    
    // Get current athletes
    const currentAthletes = await kv.get<Athlete[]>('athletes:all') || defaultAthletes;
    
    // Add new athlete
    const updatedAthletes = [...currentAthletes, newAthlete];
    
    // Save to KV
    await kv.set('athletes:all', updatedAthletes);
    
    // Also save individual athlete for faster lookups
    await kv.set(`athlete:${newAthlete.slug}`, newAthlete);
    
    return NextResponse.json(newAthlete, { status: 201 });
  } catch (error) {
    console.error('Error creating athlete:', error);
    return NextResponse.json(
      { error: 'Failed to create athlete' },
      { status: 500 }
    );
  }
}

// PUT /api/athletes - Update all athletes (for bulk operations)
export async function PUT(request: NextRequest) {
  try {
    const athletes: Athlete[] = await request.json();
    
    // Save updated athletes list
    await kv.set('athletes:all', athletes);
    
    // Update individual athlete records
    for (const athlete of athletes) {
      await kv.set(`athlete:${athlete.slug}`, athlete);
    }
    
    return NextResponse.json(athletes);
  } catch (error) {
    console.error('Error updating athletes:', error);
    return NextResponse.json(
      { error: 'Failed to update athletes' },
      { status: 500 }
    );
  }
}

