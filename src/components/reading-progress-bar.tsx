'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [width, setWidth] = useState(0);
  const path = usePathname();

  const scrollHeight = () => {
    const element = document.documentElement;
    const ScrollTop = element.scrollTop || document.body.scrollTop;
    const ScrollHeight = element.scrollHeight || document.body.scrollHeight;
    const clientHeight = element.clientHeight;
    const percent = (ScrollTop / (ScrollHeight - clientHeight)) * 100;

    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);
  if (path.startsWith('/post/')) {
    return (
      <div className={`absolute z-50 top-[62px] -left-3 h-[3px] bg-gradient-to-r from-slate-400 to-slate-600/90`}
        style={{ width: `${width}%` }}>
        <style global jsx>{`
          body {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          body::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
          }
        `}</style>
      </div>
    );
  } 
}
