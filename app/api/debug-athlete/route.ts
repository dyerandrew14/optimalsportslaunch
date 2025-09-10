import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    console.log('=== DEBUG ATHLETE API ===');
    console.log('1. Testing Redis connection...');
    
    // Test Redis connection
    const testKey = 'debug-test';
    await kv.set(testKey, 'test-value');
    const testValue = await kv.get(testKey);
    console.log('Redis test result:', testValue);
    
    console.log('2. Testing athlete creation...');
    const input = await request.json();
    console.log('Input received:', input);
    
    const newAthlete = {
      slug: crypto.randomUUID(),
      name: input.name || 'Test Athlete',
      position: input.position || 'QB',
      school: input.school || 'Test U',
      conference: input.conference || 'Test',
      classYear: input.classYear || '2024',
      number: input.number || '1',
      bio: input.bio || 'Test bio',
      image: input.image || '/default-athlete.jpg',
      colors: { from: '#ff0000', to: '#0000ff' },
      stats: {
        passingYards: 0,
        rushingYards: 0,
        receivingYards: 0,
        touchdowns: 0,
        interceptions: 0,
        tackles: 0,
        sacks: 0
      },
      merchandise: [],
      hasMerchandise: false,
    };
    
    console.log('3. Saving to Redis...');
    const all = (await kv.get<any[]>('athletes:all')) || [];
    console.log('Current athletes count:', all.length);
    
    all.push(newAthlete);
    await kv.set('athletes:all', all);
    await kv.set(`athlete:${newAthlete.slug}`, newAthlete);
    
    console.log('4. Verification - reading back from Redis...');
    const verifyAll = await kv.get<any[]>('athletes:all');
    const verifySingle = await kv.get(`athlete:${newAthlete.slug}`);
    
    console.log('Verification - all athletes count:', verifyAll?.length);
    console.log('Verification - single athlete:', verifySingle?.name);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Debug test completed',
      athlete: newAthlete,
      verification: {
        allCount: verifyAll?.length,
        singleName: verifySingle?.name
      }
    });
    
  } catch (e) {
    console.error('Debug athlete API error:', e);
    return NextResponse.json({ 
      success: false, 
      error: e instanceof Error ? e.message : 'Unknown error',
      stack: e instanceof Error ? e.stack : undefined
    }, { status: 500 });
  }
}
