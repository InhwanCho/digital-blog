/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Gallery</h1>
      <h2 className="text-lg text-gray-500 mb-6">Admin Panel</h2>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
    </div>
  );
}
