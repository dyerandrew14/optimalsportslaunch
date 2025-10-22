import { NextRequest, NextResponse } from 'next/server';
import { printful, formatCartForPrintful } from '@/lib/printful';
import Stripe from 'stripe';

// Initialize Stripe only when needed
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  });
};

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
      retailPrice,
      paymentIntentId 
    } = body;

    if (!product || !selectedSize || !quantity || !customerInfo || !paymentIntentId) {
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
      email: customerInfo.email,
      paymentIntentId
    });

            // Verify payment with Stripe
            try {
              const stripe = getStripe();
              const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json(
          { error: 'Payment not completed' },
          { status: 400 }
        );
      }
      
      console.log('Payment verified:', paymentIntent.id);
    } catch (stripeError) {
      console.error('Stripe verification error:', stripeError);
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Check if Printful is properly configured
    const printfulApiKey = process.env.PRINTFUL_API_KEY;
    if (!printfulApiKey || printfulApiKey === 'oVW8x5IDNQtj2NERKoYoCZFGbEy6zVrlNPheDtoy') {
      console.log('Printful not configured, creating mock order for testing');
      
      // Create a mock order for testing
      const mockOrder = {
        id: `order-${Date.now()}`,
        external_id: `optimal-${Date.now()}`,
        status: 'pending',
        created: new Date().toISOString(),
        customer: customerInfo,
        items: [{
          product: product.name,
          size: selectedSize,
          color: selectedColor,
          quantity: quantity,
          price: product.price
        }],
        total: parseFloat(product.price) * quantity
      };

      console.log('Mock order created:', mockOrder);

      return NextResponse.json({
        success: true,
        orderId: mockOrder.id,
        externalId: mockOrder.external_id,
        message: 'Order successfully created (mock mode - Printful not configured)',
        order: mockOrder,
        note: 'To enable Printful integration, please set up a valid PRINTFUL_API_KEY in your environment variables'
      });
    }

    // Try to get available Printful products
    let printfulProducts;
    try {
      printfulProducts = await printful.getProducts();
      console.log('Available Printful products:', printfulProducts.length);
    } catch (printfulError) {
      console.error('Printful API error:', printfulError);
      return NextResponse.json(
        { 
          error: 'Printful API connection failed',
          details: 'Please check your PRINTFUL_API_KEY and Printful account setup',
          fallback: 'Use /api/checkout/simple for mock orders'
        },
        { status: 500 }
      );
    }
    
    if (printfulProducts.length === 0) {
      return NextResponse.json(
        { 
          error: 'No Printful products available',
          details: 'Please create products in your Printful account first',
          fallback: 'Use /api/checkout/simple for mock orders'
        },
        { status: 400 }
      );
    }
    
    // Use the first available product for now
    const printfulProduct = printfulProducts[0];
    let variants;
    try {
      variants = await printful.getProductVariants(printfulProduct.id);
    } catch (variantError) {
      console.error('Printful variants error:', variantError);
      return NextResponse.json(
        { 
          error: 'Failed to get product variants',
          details: 'Please check your Printful product setup',
          fallback: 'Use /api/checkout/simple for mock orders'
        },
        { status: 500 }
      );
    }
    
    if (variants.length === 0) {
      return NextResponse.json(
        { 
          error: 'No variants available for the selected product',
          details: 'Please set up product variants in Printful',
          fallback: 'Use /api/checkout/simple for mock orders'
        },
        { status: 400 }
      );
    }
    
    // Find the correct variant ID based on selected size
    let variantId = null;
    
    // Check if product has variantIdsBySize mapping
    if (product.variantIdsBySize && product.variantIdsBySize[selectedSize]) {
      variantId = product.variantIdsBySize[selectedSize];
      console.log(`Using size-specific variant ID for ${selectedSize}: ${variantId}`);
    } else if (product.printfulVariantId) {
      variantId = product.printfulVariantId;
      console.log(`Using general variant ID: ${variantId}`);
    } else {
      // Fallback to first available variant
      const variant = variants[0];
      variantId = variant.id;
      console.log(`Using fallback variant ID: ${variantId}`);
    }
    
    // Format items for Printful
    const items = [{
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: quantity,
      variantId: variantId, // Use the correct variant ID based on size
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
    console.error('Checkout error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });
    
    // Handle specific Printful API errors
    if (error instanceof Error && error.message.includes('Printful API Error')) {
      return NextResponse.json(
        { 
          error: 'Printful API Error: ' + error.message,
          details: 'Order processing failed. Please check Printful configuration.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        type: 'checkout_error'
      },
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
