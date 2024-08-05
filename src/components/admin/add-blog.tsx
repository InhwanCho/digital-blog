'use client';
import { useState } from 'react';

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Add Blog</h1>
      <h2 className="text-lg text-gray-500 mb-6">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter small title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-lg font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter slug title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="categories" className="block text-lg font-medium text-gray-700">
            Select Category <span className="text-sm text-gray-500">(ctrl + leftclick for multiple select)</span>
          </label>
          <select
            id="categories"
            multiple
            value={categories}
            onChange={handleCategoryChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Html, Css & javaScript">Html, Css & javaScript</option>
            <option value="Next Js, React js">Next Js, React js</option>
            <option value="Database">Database</option>
            <option value="Deployment">Deployment</option>
          </select>
          <p className="mt-2 text-sm text-gray-500">Selected: {categories.join(', ')}</p>
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Blog Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}
