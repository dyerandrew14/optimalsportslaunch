"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <footer className="py-16 mt-16 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={mounted && resolvedTheme === 'light' 
                  ? "/output-onlinepngtools (5).png" 
                  : "/Final_2_Transparent_png_180x-_1_.png"
                } 
                alt="Optimal Sports Management" 
                className="h-12 w-auto" 
              />
            </div>
            <p className="text-gray-400 mb-4">Professional sports management and marketing services for college athletes.</p>
            <div className="flex gap-3">
              <a href="https://instagram.com/optimalsportsmgmt" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-3 text-gray-900 dark:text-white">Main</div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/athletes" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Athletes</a></li>
              <li><a href="/services" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Services</a></li>
              <li><a href="/catalog" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3 text-gray-900 dark:text-white">Services</div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">NIL Representation</a></li>
              <li><a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Contract Negotiation</a></li>
              <li><a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Marketing & Branding</a></li>
              <li><a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Merchandise</a></li>
              <li><a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Career Planning</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3 text-gray-900 dark:text-white">Get Updates</div>
            <p className="text-gray-400 text-sm mb-4">Get NIL updates, merch drops, and growth tips.</p>
            <div className="flex gap-2">
              <input className="px-3 py-2 rounded-lg text-black text-sm border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Your email" />
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">Join</button>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>Email: christophergil@optimalsports.net</p>
              <p className="mt-1">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-neutral-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 dark:text-gray-500 text-sm">© {new Date().getFullYear()} <a href="/admin" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Optimal Sports Management</a>. All rights reserved.</div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


