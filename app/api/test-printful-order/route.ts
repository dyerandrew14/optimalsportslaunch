import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('=== TESTING PRINTFUL ORDER CREATION ===');
    
    // Test with a simple order using store ID 16862505
    const testOrder = {
      external_id: `test-${Date.now()}`,
      shipping: 'STANDARD',
      recipient: {
        name: 'Test Customer',
        address1: '123 Test St',
        city: 'Test City',
        state_code: 'CA',
        country_code: 'US',
        zip: '90210',
        email: 'test@example.com',
      },
      items: [{
        variant_id: 1, // Try with variant ID 1 as a test
        quantity: 1,
        retail_price: '25.00',
      }],
    };

    console.log('Testing with store ID 16862505...');
    console.log('Test order:', testOrder);

    const response = await fetch('https://api.printful.com/stores/16862505/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrder),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response body:', responseText);

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      response: responseText,
      testOrder: testOrder,
      message: response.ok ? 'Test order created successfully!' : 'Test order failed'
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
