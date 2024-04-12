'use client';
import { cn } from '@/lib/utils';
import { useKBar } from 'kbar';

export default function KBarButton() {
  const { query } = useKBar();
  
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center rounded-lg p-1 text-xs',
        'bg-secondary transition-colors dark:bg-slate-800 dark:hover:bg-slate-800/70 hover:bg-slate-200/80',
      )}
      onClick={query.toggle}
    >
      <span className="px-3">Search...</span>
      <div
        className={cn(
          'ml-auto rounded-lg px-2 py-1',
          'bg-slate-300/80 dark:bg-slate-700 border transition-colors dark:border-neutral-800',
        )}
      >
        ⌘ + K
      </div>
    </button>
  );
}