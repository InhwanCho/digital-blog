// src/components/admin/admin-gallery.tsx
'use client';
import { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';

export default function AdminGallery() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);

  const handleAddImage = () => {
    const newImage = { title, description, imageUrl };
    // setImages([...images, newImage]);
    // setTitle('');
    // setDescription('');
    // setImageUrl('');
  };

  return (
    <AdminLayout title="Gallery">
      <div className="bg-white dark:bg-gray-900 dark:text-gray-200 p-6 rounded-lg shadow space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <button
          type="button"
          onClick={handleAddImage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Image
        </button>
      </div>      
    </AdminLayout>
  );
}