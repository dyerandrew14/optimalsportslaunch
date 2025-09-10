import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';

export async function GET() {
  try {
    console.log('=== SIMPLE TEST START ===');
    
    // Test 1: Can we read from Redis?
    const testData = await kv.get('test:simple');
    console.log('Test read result:', testData);
    
    // Test 2: Can we write to Redis?
    await kv.set('test:simple', { message: 'Hello from test', timestamp: Date.now() });
    console.log('Test write successful');
    
    // Test 3: Can we read what we just wrote?
    const verifyData = await kv.get('test:simple');
    console.log('Verify read result:', verifyData);
    
    // Test 4: Try the athletes key
    const athletes = await kv.get('athletes:all');
    console.log('Athletes from Redis:', athletes);
    
    console.log('=== SIMPLE TEST SUCCESS ===');
    return NextResponse.json({ 
      success: true, 
      message: 'All Redis operations working',
      testData,
      verifyData,
      athletesCount: Array.isArray(athletes) ? athletes.length : 'Not an array'
    });
  } catch (error) {
    console.error('=== SIMPLE TEST ERROR ===');
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
