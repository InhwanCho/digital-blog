'use client';
import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

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

  return (
    <div className={`fixed z-50 top-[54px] left-0 h-[1.5px] bg-gradient-to-r from-slate-400 to-slate-600/90`}
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
