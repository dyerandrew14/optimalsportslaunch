import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';

export async function POST(request: NextRequest) {
  try {
    console.log('Test athlete API called');
    const input = await request.json();
    console.log('Input received:', input);
    
    // Simple test - just return success
    return NextResponse.json({ success: true, message: 'Test athlete API working' }, { status: 200 });
  } catch (e) {
    console.error('Test athlete API error:', e);
    return NextResponse.json({ error: 'Test failed', details: e.message }, { status: 500 });
  }
}
