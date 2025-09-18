import { NextRequest, NextResponse } from 'next/server';
import { printful, formatCartForPrintful } from '@/lib/printful';

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

    if (!product || !selectedSize || !quantity || !customerInfo) {
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

    // Format items for Printful
    const items = [{
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: quantity,
      variantId: 1, // Default variant ID - you may need to map this based on size/color
      size: selectedSize,
      color: selectedColor
    }];

    // Create Printful order
    const printfulOrder = formatCartForPrintful(items, customerInfo);

    // Send to Printful
    const printfulResponse = await printful.createOrder(printfulOrder);

    console.log('Printful order created:', printfulResponse);

    // Return success response
    return NextResponse.json({
      success: true,
      orderId: printfulResponse.id,
      externalId: printfulResponse.external_id,
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

    const shippingRates = await printful.getShippingRates(
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
      shippingRates: shippingRates
    });

  } catch (error) {
    console.error('Shipping rates error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate shipping rates' },
      { status: 500 }
    );
  }
}
