import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST ATHLETE CREATION ===');
    
    // Create a simple test athlete with minimal required fields
    const testAthlete = {
      slug: 'test-athlete-123',
      name: 'Test Athlete',
      position: 'QB',
      school: 'Test University',
      conference: 'Test Conference',
      classYear: 'Senior',
      number: '1',
      image: '/test.jpg',
      colors: { from: '#ff0000', to: '#0000ff' },
      stats: {
        passingYards: 1000,
        rushingYards: 100,
        receivingYards: 0,
        touchdowns: 10,
        interceptions: 2,
        tackles: 0,
        sacks: 0
      },
      hasMerchandise: false
    };
    
    console.log('Test athlete data:', JSON.stringify(testAthlete, null, 2));
    
    // Try to save to Redis exactly like executives do
    const all = (await kv.get('athletes:all')) || [];
    console.log('Current athletes count:', all.length);
    
    all.push(testAthlete);
    console.log('Updated athletes count:', all.length);
    
    await kv.set('athletes:all', all);
    console.log('Saved athletes:all to KV');
    
    await kv.set(`athlete:${testAthlete.slug}`, testAthlete);
    console.log('Saved individual athlete to KV');
    
    console.log('=== TEST SUCCESS ===');
    return NextResponse.json({ success: true, message: 'Test athlete created successfully' });
  } catch (error) {
    console.error('=== TEST ERROR ===');
    console.error('Error:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
