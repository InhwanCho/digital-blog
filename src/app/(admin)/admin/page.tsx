// @/app/admin/page.tsx
import { createClient } from '@/lib/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/');
  }
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-right-only h-screen">
        <div className="p-4 flex justify-center">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-4 pl-4">
          <ul>
            <li>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">Posts</a>
            </li>
            <li>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">Comments</a>
            </li>
            <li>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">Users</a>
            </li>
            <li>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">Post Overview</h2>
            <p>Number of posts: 100</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">User Overview</h2>
            <p>Number of users: 50</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">Comment Overview</h2>
            <p>Number of comments: 200</p>
          </div>
        </div>
      </main>
    </div>
  );
};
