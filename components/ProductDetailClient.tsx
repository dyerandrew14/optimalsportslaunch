"use client";

import { useState } from "react";
import Image from "next/image";
import CheckoutForm from "./CheckoutForm";
import type { Product } from "@/lib/products";
import { athletes } from "@/lib/athletes";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  // Find the associated athlete
  const athlete = product.athleteSlug 
    ? athletes.find(a => a.slug === product.athleteSlug)
    : product.athleteName 
    ? athletes.find(a => a.name === product.athleteName)
    : null;

  const handleCheckout = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color before checkout');
      return;
    }
    setShowCheckout(true);
  };

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-600 via-red-700 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-3">{product.name}</h1>
            <p className="text-gray-100/90 max-w-2xl mx-auto">
              {product.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto mt-6 rounded-full"></div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-20 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Product Images */}
              <div className="space-y-6">
                {product.images && product.images.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {product.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden">
                        <Image
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
                      ${product.price}
                    </span>
                    {product.categories && product.categories.length > 0 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                        {product.categories[0]}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sizes Available</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedSize === size
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-red-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection - Disabled until colors are added to Product type */}
                {/* {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Colors Available</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedColor === color
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-red-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Checkout with Printful
                </button>

                {/* Player Card */}
                {athlete && (
                  <div className="relative bg-black rounded-3xl shadow-2xl overflow-hidden group hover:shadow-red-500/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 max-w-xl">
                    <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-white/10" />
                    <div className="p-6 flex items-center gap-5">
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-red-500/40 flex-shrink-0 relative">
                        <Image
                          src={athlete.image}
                          alt={athlete.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-white mb-1 truncate">{athlete.name}</h4>
                        <p className="text-red-400 font-semibold text-sm mb-2">{athlete.position} • {athlete.school}</p>
                        <p className="text-gray-300 text-sm line-clamp-2">{athlete.bio}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Accordion */}
            <div className="mt-16 max-w-4xl">
              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-neutral-700 rounded-xl">
                  <summary className="px-5 py-4 cursor-pointer flex justify-between items-center text-lg text-gray-900 dark:text-white font-semibold">
                    Product Details
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                    <p>{product.description}</p>
                    {product.categories && (
                      <div className="mt-4">
                        <strong>Categories:</strong> {product.categories.join(', ')}
                      </div>
                    )}
                  </div>
                </details>
                
                <details className="group border border-gray-200 dark:border-neutral-700 rounded-xl">
                  <summary className="px-5 py-4 cursor-pointer flex justify-between items-center text-lg text-gray-900 dark:text-white font-semibold">
                    Sizing & Care
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                    Most apparel fits true-to-size. Wash cold and tumble dry low to preserve print quality.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutForm
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            sizes: product.sizes || [],
            colors: [], // Disabled until colors are added to Product type
          }}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
