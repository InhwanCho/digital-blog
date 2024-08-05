'use client';
import { useState } from 'react';
import { posts } from '#site/content';

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Blogs</h1>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">#</th>
            <th className="p-2 border border-gray-300">Title</th>
            <th className="p-2 border border-gray-300">Categories</th>
            <th className="p-2 border border-gray-300">Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.slug} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-300 text-center">{(currentPage - 1) * postsPerPage + index + 1}</td>
              <td className="p-2 border border-gray-300">{post.title}</td>
              <td className="p-2 border border-gray-300">{post.categories.join(', ')}</td>
              <td className="p-2 border border-gray-300 text-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg mr-2">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg">Delete</button>
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
            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
