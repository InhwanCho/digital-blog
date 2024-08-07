interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800/90 rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300">{title}</h1>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        {children}
      </div>
    </div>
  );
}