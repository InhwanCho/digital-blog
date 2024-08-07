// src/components/admin/pending.tsx
'use client';
import { useState } from 'react';
import { posts } from '#site/content';
import AdminLayout from '@/components/admin/admin-layout';

export default function Pending() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  // 게시되지 않은 게시물만 필터링
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) && !post.published
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <AdminLayout title="Pending Blogs">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2 border border-gray-300 dark:border-gray-600">#</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Title</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Categories</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Edit / Publish</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.slug} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-2 border border-gray-300 dark:border-gray-600 text-center">{(currentPage - 1) * postsPerPage + index + 1}</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">{post.title}</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">{post.categories.join(', ')}</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600 text-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg mr-2">Edit</button>
                <button className="px-3 py-1 bg-green-500 text-white rounded-lg">Publish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </AdminLayout>
  );
}