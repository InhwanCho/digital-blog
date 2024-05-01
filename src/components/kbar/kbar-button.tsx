'use client';
import { cn } from '@/lib/utils';
import { useKBar } from 'kbar';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KBarButtonProps {
  isMobile?: boolean
}

export default function KBarButton({ isMobile = false }: KBarButtonProps) {
  const { query } = useKBar();

  return (
    <>
      {isMobile ?
        <Button variant="ghost" className="w-10 px-0 flex sm:hidden" onClick={query.toggle} >
          <span className="sr-only">Mobile search button</span>
          <Search className="size-5" />
        </Button>
        :
        <>
          <button
            className={cn(
              'hidden md:flex cursor-pointer items-center rounded-lg p-1 text-xs ',
              'bg-secondary transition-colors dark:bg-slate-800 dark:hover:bg-slate-800/70 hover:bg-slate-200/80',
            )}
            onClick={query.toggle}
          >
            <span className="sr-only">Search button</span>
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
          <Button variant="ghost" className="w-10 px-0 flex md:hidden" onClick={query.toggle} >
            <span className="sr-only">Mobile search button</span>
            <Search className="size-5" />
          </Button>
        </>
      }
    </>
  );
}