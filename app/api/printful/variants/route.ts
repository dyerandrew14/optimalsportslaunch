import { NextRequest, NextResponse } from 'next/server';
import { printful } from '@/lib/printful';

// Helper function to add delay between API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching YOUR Printful store products and variants...');
    
    // Get YOUR products from your Printful store (not the catalog)
    const products = await printful.getProducts();
    console.log(`Found ${products.length} products in YOUR Printful store`);
    
    // Process all YOUR products (should only be 2)
    const productsWithVariants = [];
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      try {
        // Add small delay between requests to be respectful to API
        if (i > 0) {
          await delay(500); // 0.5 second delay between requests
        }
        
        const variants = await printful.getProductVariants(product.id);
        console.log(`Product ${product.id} (${product.name}) has ${variants.length} variants`);
        
        productsWithVariants.push({
          productId: product.id,
          productName: product.name,
          variants: variants.map(variant => ({
            variantId: variant.id,
            sku: variant.sku,
            size: variant.size,
            color: variant.color,
            price: variant.price,
            availabilityRegions: variant.availability_regions
          }))
        });
      } catch (error) {
        console.error(`Error fetching variants for product ${product.id}:`, error);
        
        // If we hit rate limit, stop processing
        if (error instanceof Error && error.message.includes('429')) {
          console.log('Rate limit hit, stopping processing');
          break;
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      products: productsWithVariants,
      totalProducts: productsWithVariants.length,
      message: `Found ${productsWithVariants.length} products in YOUR Printful store`
    });
    
  } catch (error) {
    console.error('Error fetching Printful variants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Printful variants' },
      { status: 500 }
    );
  }
}
