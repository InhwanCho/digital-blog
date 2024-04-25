'use client';
import { Post } from '#site/content';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';

export type PostSeriesProps = {
  series: Post[] | null,
  current: Post | null,
};

export default function PostSeries({ series, current }: PostSeriesProps) {
  const [open, setOpen] = useState(true);

  const onClickCard = () => {
    !open && setOpen(!open);
  };
  return (
    <div
      className={cn(
        'bg-slate-100/60 dark:bg-slate-800 rounded-lg p-4',
        !open && 'cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-700',
      )}
      onClick={onClickCard}
    >
      <p className="text-base font-bold sm:text-lg border-b dark:border-b-slate-400">연관된 포스트 구경가기</p>
      
      {open && <div className='mt-4 flex flex-col gap-2 text-sm sm:text-base'>
        {series?.map((post, index) => (
          current?.title === post.title ?
            <span key={index} className='font-bold text-slate-900 dark:text-slate-100 bg-slate-200/60 dark:bg-slate-900/80 rounded-sm'>
              {`> ${index + 1}. ${post.title}`}
            </span> :
            <Link key={index} href={`/post/${post.slugAsParams}`} className='no-underline hover:underline hover:text-slate-600 dark:hover:text-slate-200'>
              {index + 1}. {post.title}
            </Link>
        ))}
      </div>
      }
      <span
        className="pt-2 mr-auto cursor-pointer text-sm select-none hover:text-slate-700 dark:hover:text-slate-400"
        onClick={() => setOpen(false)} draggable={false}
      >
        {open ? '간략히' : '펼치기'}
      </span>
    </div>
  );
}
