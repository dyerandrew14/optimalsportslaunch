import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';

export async function GET() {
  try {
    console.log('Testing Redis connection...');
    console.log('Redis URL exists:', !!process.env.redis_KV_REST_API_URL);
    console.log('Redis Token exists:', !!process.env.redis_KV_REST_API_TOKEN);
    
    // Test basic Redis operations
    await kv.set('test:key', 'test value');
    const value = await kv.get('test:key');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Redis connection working',
      testValue: value,
      envVars: {
        urlExists: !!process.env.redis_KV_REST_API_URL,
        tokenExists: !!process.env.redis_KV_REST_API_TOKEN
      }
    });
  } catch (error) {
    console.error('Redis test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      envVars: {
        urlExists: !!process.env.redis_KV_REST_API_URL,
        tokenExists: !!process.env.redis_KV_REST_API_TOKEN
      }
    }, { status: 500 });
  }
}
