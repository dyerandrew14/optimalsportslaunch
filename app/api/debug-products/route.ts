import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/redis';

export async function GET() {
  try {
    console.log('=== DEBUG PRODUCTS API ===');
    
    // Check what's in Redis
    const allProducts = await kv.get('products:all');
    console.log('Products in Redis:', allProducts?.length || 0);
    console.log('First product:', allProducts?.[0]);
    
    return NextResponse.json({
      success: true,
      count: allProducts?.length || 0,
      products: allProducts || []
    });
    
  } catch (e) {
    console.error('Debug products error:', e);
    return NextResponse.json({ 
      success: false, 
      error: e instanceof Error ? e.message : 'Unknown error'
    }, { status: 500 });
  }
}
