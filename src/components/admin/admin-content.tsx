'use client';
// src/components/admin/admin-content.tsx
import { useEffect, useState } from 'react';
import Dashboard from '@/components/admin/dashboard';
import Blogs from '@/components/admin/blogs';
import AddBlog from '@/components/admin/add-blog';
import Pending from '@/components/admin/pending';
import AdminGallery from '@/components/admin/admin-gallery';
import Settings from '@/components/admin/settings';

export default function AdminContent() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
    case 'dashboard':
      return <Dashboard />;
    case 'blogs':
      return <Blogs />;
    case 'add-blog':
      return <AddBlog />;
    case 'pending':
      return <Pending />;
    case 'settings':
      return <Settings />;
    case 'admin-gallery':
      return <AdminGallery />;
    default:
      return <Dashboard />;
    }
  };

  useEffect(() => {
    const menuItems = document.querySelectorAll('[data-component]');
    const handleClick = (e: Event) => {
      const component = (e.target as HTMLElement).getAttribute('data-component');
      if (component) {
        setActiveComponent(component);
      }
    };

    menuItems.forEach(item => item.addEventListener('click', handleClick));

    return () => {
      menuItems.forEach(item => item.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <div className="flex-1 p-10 bg-gray-100">
      {renderComponent()}
    </div>
  );
}
