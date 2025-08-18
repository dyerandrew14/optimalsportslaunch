"use client";

import { useState } from "react";

type MerchandiseItem = {
  id: number | string;
  name: string;
  price: string | number;
  image?: string;
  link?: string;
};

export function AthleteShop({
  athleteName,
  hasMerchandise,
  merchandiseItems,
}: {
  athleteName: string;
  hasMerchandise: boolean;
  merchandiseItems: MerchandiseItem[];
}) {
  const [isShopOpen, setIsShopOpen] = useState(false);

  if (!hasMerchandise) return null;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-gray-200 dark:border-neutral-700 shadow-xl overflow-hidden">
      <button
        onClick={() => setIsShopOpen(!isShopOpen)}
        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              🏈 {athleteName}&apos;s Official Shop
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Support {athleteName}&apos;s NIL journey with official merchandise
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isShopOpen ? "Hide" : "Show"} Products
            </span>
            <svg
              className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                isShopOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isShopOpen && (
        <div className="px-6 pb-6 border-t border-gray-200 dark:border-neutral-700">
          {merchandiseItems && merchandiseItems.length > 0 ? (
            <div className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {merchandiseItems.map((item) => (
                  <div
                    key={String(item.id)}
                    className="bg-gray-50 dark:bg-neutral-700 rounded-xl p-4 border border-gray-200 dark:border-neutral-600 hover:shadow-md transition-shadow group"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Product Image</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-red-600 dark:text-red-400">{item.price}</span>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                          Buy Now
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">Unavailable</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Merchandise coming soon! Check back later for {athleteName}&apos;s official products.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


