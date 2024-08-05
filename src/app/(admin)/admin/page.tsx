// src/app/(admin)/admin/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

// 동적 임포트를 사용하여 CSR 컴포넌트를 로드합니다.
const AdminContent = dynamic(() => import('@/components/admin/admin-content'), { ssr: false });

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex">
      <nav className="w-64 bg-gray-800 text-white p-5">
        <ul>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" data-component="dashboard">
            Dashboard
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" data-component="admin-gallery">
            Gallery
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" data-component="blogs">
            Blogs
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" data-component="add-blog">
            Add Blog
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" data-component="pending">
            Pending
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" data-component="settings">
            Settings
          </li>
        </ul>
      </nav>
      <main className="flex-1 px-10 bg-gray-100">
        <AdminContent />
      </main>
    </div>
  );
}
