import { NextRequest, NextResponse } from 'next/server';
import { printful } from '@/lib/printful';

// Helper function to add delay between API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching Printful products and variants...');
    
    // Get all products from Printful
    const products = await printful.getProducts();
    console.log(`Found ${products.length} products in Printful`);
    
    // Limit to first 10 products to avoid rate limiting
    const limitedProducts = products.slice(0, 10);
    console.log(`Processing first ${limitedProducts.length} products to avoid rate limits`);
    
    const productsWithVariants = [];
    
    for (let i = 0; i < limitedProducts.length; i++) {
      const product = limitedProducts[i];
      
      try {
        // Add delay between requests to avoid rate limiting
        if (i > 0) {
          await delay(1000); // 1 second delay between requests
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
        if (error.message && error.message.includes('429')) {
          console.log('Rate limit hit, stopping processing');
          break;
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      products: productsWithVariants,
      totalProducts: productsWithVariants.length,
      message: `Processed ${productsWithVariants.length} products (limited to avoid rate limits)`
    });
    
  } catch (error) {
    console.error('Error fetching Printful variants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Printful variants' },
      { status: 500 }
    );
  }
}
