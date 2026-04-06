import React from "react";
import { Calculator } from "lucide-react";

export const Navbar = () => (
  <nav className='w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-between h-16 items-center'>
        <div className='flex items-center gap-2'>
          <div className='bg-brand-primary p-1.5 rounded-lg'>
            <Calculator className='w-6 h-6 text-white' />
          </div>
          <span className='text-xl font-bold tracking-tight text-brand-primary'>
            QuoteCraft <span className='text-brand-accent'>AI</span>
          </span>
        </div>
        <div className='hidden md:flex items-center gap-8 text-sm font-medium text-muted'>
          <a href='#' className='hover:text-brand-accent transition-colors'>
            How it works
          </a>
          <a href='#' className='hover:text-brand-accent transition-colors'>
            Pricing
          </a>
          <a href='#' className='hover:text-brand-accent transition-colors'>
            Templates
          </a>
          <button className='bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-brand-accent transition-colors cursor-pointer'>
            Agency Login
          </button>
        </div>
      </div>
    </div>
  </nav>
);
