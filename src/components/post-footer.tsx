import { Link } from 'next-view-transitions';


import { Post } from "#site/content";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PostFooterProps = {
  prevPost: Post | null,
  nextPost: Post | null
};

export default function PostFooter({ prevPost, nextPost }: PostFooterProps) {
  return (
    <div className="-mx-4 flex items-center text-xs font-semibold sm:mx-0 sm:text-base justify-between w-full">
      {prevPost && (
        <div>
          <p>이전 포스트</p>
          <Link href={`/post/${prevPost.slugAsParams}`} className="group gap-3 px-2 py-2 flex items-center custom-underline hover:text-slate-600 dark:hover:text-slate-300">
            <ChevronLeft className='size-5' />
            <span>{prevPost.title}</span>
          </Link>
        </div>
      )}
      {nextPost && (
        <div className='text-end'>
          <p>다음 포스트</p>
          <Link href={`/post/${nextPost.slugAsParams}`} className="group ml-auto gap-3 px-2 py-2 text-right flex custom-underline items-center hover:text-slate-600 dark:hover:text-slate-300">
            <span>{nextPost.title}</span>
            <ChevronRight className='size-5' />
          </Link>
        </div>
      )}
    </div>
  );
}
