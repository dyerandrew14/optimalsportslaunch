import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('=== DEBUGGING PRINTFUL API ===');
    
    // Test 1: Get all products without store filter
    console.log('1. Testing /products endpoint (no store filter)...');
    const allProductsResponse = await fetch('https://api.printful.com/products', {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    const allProductsData = await allProductsResponse.json();
    console.log(`All products count: ${allProductsData.result?.length || 0}`);
    
    // Test 2: Get products with store filter
    console.log('2. Testing /stores/7957549/products endpoint...');
    const storeProductsResponse = await fetch('https://api.printful.com/stores/7957549/products', {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    const storeProductsData = await storeProductsResponse.json();
    console.log(`Store products count: ${storeProductsData.result?.length || 0}`);
    
    // Test 3: Get store info
    console.log('3. Testing /stores endpoint...');
    const storesResponse = await fetch('https://api.printful.com/stores', {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    const storesData = await storesResponse.json();
    console.log(`Stores count: ${storesData.result?.length || 0}`);
    
    return NextResponse.json({
      success: true,
      debug: {
        allProductsCount: allProductsData.result?.length || 0,
        storeProductsCount: storeProductsData.result?.length || 0,
        storesCount: storesData.result?.length || 0,
        allProductsSample: allProductsData.result?.slice(0, 3) || [],
        storeProductsSample: storeProductsData.result?.slice(0, 3) || [],
        stores: storesData.result || []
      }
    });
    
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Debug failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
