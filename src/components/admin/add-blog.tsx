// src/components/admin/add-blog.tsx
'use client';
import { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setCategories(selectedOptions);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 블로그 제출 로직 추가
    console.log({ title, slug, categories, content });
  };

  return (
    <AdminLayout title="Add Blog">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 dark:text-gray-200 p-6 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter small title"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter slug title"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="categories" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Select Category <span className="text-sm text-gray-500 dark:text-gray-400">(ctrl + leftclick for multiple select)</span>
          </label>
          <select
            id="categories"
            multiple
            value={categories}
            onChange={handleCategoryChange}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="Html, Css & javaScript">Html, Css & javaScript</option>
            <option value="Next Js, React js">Next Js, React js</option>
            <option value="Database">Database</option>
            <option value="Deployment">Deployment</option>
          </select>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Selected: {categories.join(', ')}</p>
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Blog Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </AdminLayout>
  );
}