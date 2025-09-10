import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';
import crypto from 'crypto';
import { type Athlete } from '@/lib/athletes';

const KEY_ALL = 'athletes:all';

export async function GET() {
  let all: Athlete[] = [];
  try {
    all = (await kv.get<Athlete[]>(KEY_ALL)) || [];
    console.log('Athletes from KV:', all.length);
  } catch (error) {
    console.log('KV error for athletes:', error);
    all = [];
  }
  if (all.length === 0) {
    // Seed with default athletes if KV is unavailable
    all = [
      {
        slug: 'jonah-coleman',
        name: 'Jonah Coleman',
        position: 'Running Back',
        school: 'University of Washington',
        conference: 'Big Ten',
        classYear: 'Junior',
        number: '0',
        bio: 'Dynamic running back with explosive speed',
        image: '/players/jonah-coleman.svg',
        colors: { from: '#4B2E83', to: '#B7A57A' },
        stats: {
          passingYards: 0,
          rushingYards: 1200,
          receivingYards: 150,
          touchdowns: 12,
          interceptions: 0,
          tackles: 0,
          sacks: 0
        },
        merchandise: [],
        hasMerchandise: false
      }
    ];
    try { await kv.set(KEY_ALL, all); } catch {}
  }
  return NextResponse.json(all);
}

export async function POST(request: NextRequest) {
  try {
    const input = (await request.json()) as Omit<Athlete, 'slug'> & { slug?: string };
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
    const all = (await kv.get<Athlete[]>(KEY_ALL)) || [];
    all.push(newAthlete);
    await kv.set(KEY_ALL, all);
    await kv.set(`athlete:${newAthlete.slug}`, newAthlete);
    console.log('Successfully saved athlete to KV');
    return NextResponse.json(newAthlete, { status: 201 });
  } catch (e) {
    console.error('Error creating athlete:', e);
    return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const athletes = (await request.json()) as Athlete[];
    await kv.set(KEY_ALL, athletes);
    for (const athlete of athletes) {
      await kv.set(`athlete:${athlete.slug}`, athlete);
    }
    return NextResponse.json(athletes);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save athletes' }, { status: 500 });
  }
}