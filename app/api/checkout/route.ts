import { NextRequest, NextResponse } from 'next/server';
import { getPrintfulAPI, createPrintfulOrder } from '@/lib/printful';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { 
      product, 
      selectedSize, 
      selectedColor, 
      quantity, 
      customerInfo,
      retailPrice 
    } = body;

    if (!product || !selectedSize || !selectedColor || !quantity || !customerInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate customer info
    const { name, email, address1, city, state, country, zip } = customerInfo;
    if (!name || !email || !address1 || !city || !state || !country || !zip) {
      return NextResponse.json(
        { error: 'Incomplete customer information' },
        { status: 400 }
      );
    }

    console.log('Processing checkout order:', {
      product: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
      customer: customerInfo.name,
      email: customerInfo.email
    });

    // Create Printful order
    const printfulOrder = createPrintfulOrder(
      product,
      selectedSize,
      selectedColor,
      quantity,
      customerInfo,
      retailPrice
    );

    // Send to Printful
    const printfulAPI = getPrintfulAPI();
    const printfulResponse = await printfulAPI.createOrder(printfulOrder);

    console.log('Printful order created:', printfulResponse);

    // Return success response
    return NextResponse.json({
      success: true,
      orderId: printfulResponse.result.id,
      externalId: printfulOrder.external_id,
      message: 'Order successfully placed with Printful'
    });

  } catch (error) {
    console.error('Checkout error:', error);
    
    // Handle specific Printful API errors
    if (error instanceof Error && error.message.includes('Printful API Error')) {
      return NextResponse.json(
        { error: 'Order processing failed. Please try again or contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Get shipping rates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const zip = searchParams.get('zip');
    const variantId = searchParams.get('variantId');
    const quantity = searchParams.get('quantity');

    if (!country || !state || !city || !zip || !variantId || !quantity) {
      return NextResponse.json(
        { error: 'Missing required shipping parameters' },
        { status: 400 }
      );
    }

    const printfulAPI = getPrintfulAPI();
    const shippingRates = await printfulAPI.calculateShipping(
      {
        name: 'Customer',
        address1: '123 Main St',
        city,
        state_code: state,
        country_code: country,
        zip,
      },
      [
        {
          variant_id: parseInt(variantId),
          quantity: parseInt(quantity),
        }
      ]
    );

    return NextResponse.json({
      success: true,
      shippingRates: shippingRates.result
    });

  } catch (error) {
    console.error('Shipping rates error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate shipping rates' },
      { status: 500 }
    );
  }
}
