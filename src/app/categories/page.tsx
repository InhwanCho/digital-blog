import CategoryList from '@/components/category-list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Category",
  description: "Blog categories I've written",
};

export default function CategoriesPage() {
  
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-2xl md:text-3xl">Categories</h1>
        </div>
      </div>
      <hr className="my-4" />    
      <div className='pb-6'>
        <CategoryList/>
      </div>      
    </div>
  );
}
