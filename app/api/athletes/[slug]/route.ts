import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { type Athlete, athletes as defaultAthletes } from '@/lib/athletes';

// GET /api/athletes/[slug]
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const athlete = (await kv.get<Athlete | null>(`athlete:${slug}`)) ?? null;
    if (!athlete) {
      // Attempt fallback from the default list if exists
      const fallback = defaultAthletes.find((a) => a.slug === slug) ?? null;
      if (!fallback) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(fallback);
    }
    return NextResponse.json(athlete);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch athlete' }, { status: 500 });
  }
}

// PUT /api/athletes/[slug]
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const input: Athlete = await request.json();
    // Update individual
    await kv.set(`athlete:${slug}`, input);
    // Update list
    const all = (await kv.get<Athlete[]>('athletes:all')) || defaultAthletes;
    const idx = all.findIndex((a) => a.slug === slug);
    const next = [...all];
    if (idx === -1) next.push(input); else next[idx] = input;
    await kv.set('athletes:all', next);
    return NextResponse.json(input);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update athlete' }, { status: 500 });
  }
}

// DELETE /api/athletes/[slug]
export async function DELETE(_request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    // Remove from list
    const all = (await kv.get<Athlete[]>('athletes:all')) || [];
    const next = all.filter((a) => a.slug !== slug);
    await kv.set('athletes:all', next);
    // Remove individual
    await kv.del(`athlete:${slug}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete athlete' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { athletes as defaultAthletes, type Athlete } from '@/lib/athletes';

// GET /api/athletes/[slug] - Get specific athlete
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Try to get from individual record first (faster)
    let athlete: Athlete | null = await kv.get<Athlete>(`athlete:${slug}`);
    
    if (!athlete) {
      // Fallback: search in full athletes list
      const allAthletes = await kv.get<Athlete[]>('athletes:all') || defaultAthletes;
      athlete = allAthletes.find(a => a.slug === slug) ?? null;
      
      // If found, cache it for future requests
      if (athlete) {
        await kv.set(`athlete:${slug}`, athlete);
      }
    }
    
    if (!athlete) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(athlete);
  } catch (error) {
    console.error('Error fetching athlete:', error);
    
    // Fallback to default athletes
    const athlete = defaultAthletes.find(a => a.slug === params.slug);
    if (athlete) {
      return NextResponse.json(athlete);
    }
    
    return NextResponse.json(
      { error: 'Athlete not found' },
      { status: 404 }
    );
  }
}

// PUT /api/athletes/[slug] - Update specific athlete
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const updatedAthlete: Athlete = await request.json();
    
    // Get current athletes list
    const currentAthletes = await kv.get<Athlete[]>('athletes:all') || defaultAthletes;
    
    // Find and update the athlete
    const athleteIndex = currentAthletes.findIndex(a => a.slug === slug);
    
    if (athleteIndex === -1) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }
    
    // Update the athlete in the list
    currentAthletes[athleteIndex] = updatedAthlete;
    
    // Save updated list
    await kv.set('athletes:all', currentAthletes);
    
    // Update individual record
    await kv.set(`athlete:${slug}`, updatedAthlete);
    
    return NextResponse.json(updatedAthlete);
  } catch (error) {
    console.error('Error updating athlete:', error);
    return NextResponse.json(
      { error: 'Failed to update athlete' },
      { status: 500 }
    );
  }
}

// DELETE /api/athletes/[slug] - Delete specific athlete
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Get current athletes list
    const currentAthletes = await kv.get<Athlete[]>('athletes:all') || defaultAthletes;
    
    // Filter out the athlete to delete
    const updatedAthletes = currentAthletes.filter(a => a.slug !== slug);
    
    if (updatedAthletes.length === currentAthletes.length) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }
    
    // Save updated list
    await kv.set('athletes:all', updatedAthletes);
    
    // Delete individual record
    await kv.del(`athlete:${slug}`);
    
    return NextResponse.json({ message: 'Athlete deleted successfully' });
  } catch (error) {
    console.error('Error deleting athlete:', error);
    return NextResponse.json(
      { error: 'Failed to delete athlete' },
      { status: 500 }
    );
  }
}

