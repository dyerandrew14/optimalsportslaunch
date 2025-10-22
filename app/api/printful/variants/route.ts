import { NextRequest, NextResponse } from 'next/server';
import { printful } from '@/lib/printful';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching Printful products and variants...');
    
    // Get all products from Printful
    const products = await printful.getProducts();
    console.log(`Found ${products.length} products in Printful`);
    
    // Get variants for each product
    const productsWithVariants = [];
    
    for (const product of products) {
      try {
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
      }
    }
    
    return NextResponse.json({
      success: true,
      products: productsWithVariants,
      totalProducts: productsWithVariants.length
    });
    
  } catch (error) {
    console.error('Error fetching Printful variants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Printful variants' },
      { status: 500 }
    );
  }
}
