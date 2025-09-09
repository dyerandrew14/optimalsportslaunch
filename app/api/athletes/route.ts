import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';
import { athletes as defaultAthletes, type Athlete } from '@/lib/athletes';

// In-memory fallback to keep Admin usable if KV has an issue
let memoryAthletes: Athlete[] = [...defaultAthletes];

// GET /api/athletes - Get all athletes
export async function GET() {
  try {
    // Try to get athletes from KV store
    const storedAthletes = await kv.get<Athlete[]>('athletes:all');
    console.log('KV stored athletes:', storedAthletes ? storedAthletes.length : 'null');
    
    // If no athletes in KV, use memory or default athletes and save them
    if (!storedAthletes || storedAthletes.length === 0) {
      console.log('No athletes in KV, using memory or defaults');
      const athletesToUse = memoryAthletes.length > 0 ? memoryAthletes : defaultAthletes;
      await kv.set('athletes:all', athletesToUse);
      memoryAthletes = [...athletesToUse];
      return NextResponse.json(athletesToUse);
    }
    
    console.log('Returning stored athletes from KV:', storedAthletes.length);
    return NextResponse.json(storedAthletes);
  } catch (error) {
    console.error('Error fetching athletes:', error);
    console.log('Falling back to memory/default athletes. Memory count:', memoryAthletes.length);
    // Fallback to default athletes if KV fails
    const fallback = memoryAthletes.length ? memoryAthletes : defaultAthletes;
    console.log('Using fallback athletes count:', fallback.length);
    return NextResponse.json(fallback);
  }
}

// POST /api/athletes - Create new athlete (EXACT COPY OF WORKING EXECUTIVES)
export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    console.log('Creating athlete:', input.name);
    
    const newAthlete: Athlete = {
      slug: input.slug || crypto.randomUUID(),
      name: input.name,
      position: input.position,
      school: input.school,
      conference: input.conference,
      classYear: input.classYear,
      number: input.number || '',
      bio: input.bio || '',
      image: input.image || '/default-athlete.jpg',
      colors: input.colors || { from: '#ff0000', to: '#0000ff' },
      stats: input.stats || {
        passingYards: 0,
        rushingYards: 0,
        receivingYards: 0,
        touchdowns: 0,
        interceptions: 0,
        tackles: 0,
        sacks: 0
      },
      merchandise: input.merchandise || [],
      hasMerchandise: input.hasMerchandise || false,
    };
    
    const all = (await kv.get<Athlete[]>('athletes:all')) || [];
    all.push(newAthlete);
    await kv.set('athletes:all', all);
    await kv.set(`athlete:${newAthlete.slug}`, newAthlete);
    console.log('Successfully saved athlete to KV');
    return NextResponse.json(newAthlete, { status: 201 });
  } catch (e) {
    console.error('Error creating athlete:', e);
    return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 });
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

