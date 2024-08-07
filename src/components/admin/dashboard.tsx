// src/components/admin/dashboard.tsx
'use client';
import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { posts } from '#site/content';
import AdminLayout from '@/components/admin/admin-layout';

interface MonthlyData {
  month: string;
  blogs: number;
}

const getMonthlyData = (posts: any[], year: number): MonthlyData[] => {
  const months = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];

  const monthlyData = months.map(month => ({ month, blogs: 0 }));

  posts
    .filter(post => new Date(post.date).getFullYear() === year)
    .forEach(post => {
      const month = new Date(post.date).toISOString().slice(5, 7);
      const found = monthlyData.find(item => item.month === month);
      if (found) {
        found.blogs += 1;
      }
    });

  return monthlyData;
};

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const totalBlogs = posts.length;
  const totalCategories = [...new Set(posts.flatMap(post => post.categories))].length;
  const totalTags = [...new Set(posts.flatMap(post => post.tags))].length;
  const draftBlogs = posts.filter(post => !post.published).length;

  const years = [2024, 2023, 2022];
  const monthlyData = getMonthlyData(posts, selectedYear);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold">Total Blogs</h3>
          <p className="text-2xl mt-auto">{totalBlogs}</p>
        </div>
        <div className="bg-pink-500 text-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold">Total Categories</h3>
          <p className="text-2xl mt-auto">{totalCategories}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold">Total Tags</h3>
          <p className="text-2xl mt-auto">{totalTags}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold">Draft Blogs</h3>
          <p className="text-2xl mt-auto">{draftBlogs}</p>
        </div>
      </div>
      <div className="bg-white p-4 mt-10 dark:bg-gray-700/85">
        <h3 className="text-lg font-semibold mb-4">Year Overview</h3>
        <div className="flex space-x-4 mb-10">
          {years.map(year => (
            <button
              key={year}
              className={`px-4 py-2 rounded-lg shadow ${selectedYear === year ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300} className='p-2'>
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="blogs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
}
