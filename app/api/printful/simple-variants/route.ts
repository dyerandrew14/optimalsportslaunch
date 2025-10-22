import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching simple variant data...');
    
    // Get products directly from Printful API
    const response = await fetch('https://api.printful.com/stores/7957549/products', {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Printful API error: ${response.status}`);
    }
    
    const data = await response.json();
    const products = data.result || [];
    
    // Extract just the variant IDs in a simple format
    const simpleVariants = [];
    
    for (const product of products.slice(0, 3)) { // Just first 3 products
      try {
        const variantsResponse = await fetch(`https://api.printful.com/products/${product.id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (variantsResponse.ok) {
          const variantsData = await variantsResponse.json();
          const variants = variantsData.result?.variants || [];
          
          simpleVariants.push({
            productName: product.name,
            productId: product.id,
            variants: variants.map(v => ({
              variantId: v.id,
              sku: v.sku,
              size: v.size,
              color: v.color,
              price: v.price
            }))
          });
        }
      } catch (error) {
        console.error(`Error fetching variants for product ${product.id}:`, error);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: "Here are your Printful variant IDs:",
      products: simpleVariants
    });
    
  } catch (error) {
    console.error('Error fetching simple variants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch variants', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
