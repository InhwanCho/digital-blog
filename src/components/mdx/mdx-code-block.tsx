'use client';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';


export function useWatchTimeout(watch: unknown, ms: number, callback: () => void) {
  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (watch) {
      timeOut = setTimeout(callback, ms);
    }
    return () => {
      timeOut && clearInterval(timeOut);
    };
  }, [callback, ms, watch]);
}

export default function CodeBlock({ children, title, className }: React.ComponentProps<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useWatchTimeout(copied, 1500, () => {
    setCopied(false);
  });

  const handleCopy = async () => {
    let text = ref.current?.querySelector('code')?.textContent;
    if (!text) return;
  
    // 연속된 빈 줄은 하나의 줄로 줄이고, 정상적인 줄바꿈은 유지 - 줄바꿈 버그 수정
    text = text.replace(/\n\s*\n/g, '\n\n').trim();
  
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('코드를 복사했습니다.', { position: 'bottom-center' });
    } catch (e) {
      console.error(e);
      toast.error('코드 복사에 실패했습니다.', { position: 'bottom-center' });
    }
  };
  

  return (
    <div className="group w-full relative my-2 -mx-2 overflow-hidden rounded-lg sm:mx-0 sm:my-5">
      {title && (
        <div className="bg-slate-700">
          <div className="flex justify-between border-b border-b-slate-200/90 border-r border-r-slate-700/30 px-5 pl-6 pt-3 pb-2 text-sm font-bold text-slate-200/90">
            <span>{title}</span>
            <span className='flex text-muted dark:text-muted-foreground'>
              {/* code type 입력 'js'->'javascript' */}
              {className ? (className.split('-')[1].toLowerCase() === 'js' ? 'javascript' : className.split('-')[1].toLowerCase()) : null}
            </span>
          </div>
        </div>
      )}
      <pre ref={ref} className={'m-0 rounded-none whitespace-pre-wrap overflow-hidden'}>
        {children}
        <button
          className={cn(
            `absolute right-[22px] ${title ? 'top-[62px] dark:top-14' : 'top-5'} dark:right-3 flex size-[22px] items-center justify-center rounded-lg`,
            'bg-slate-700 text-xs text-slate-400 hover:text-slate-300 dark:text-slate-300',
            'opacity-0 transition-all group-hover:opacity-100',
          )}
          aria-label="copy-button"
          onClick={handleCopy}
        >
          {copied ? (
            <Copy className='size-3' />
          ) : (
            <Copy className='text-muted dark:text-slate-200 size-3' />
          )}
        </button>
      </pre>
    </div>
  );
}
