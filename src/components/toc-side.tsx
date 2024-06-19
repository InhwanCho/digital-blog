'use client';
import { Link } from 'next-view-transitions';
import { useEffect, useState } from 'react';

interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface TocSideProps {
  tableOfContents: TocEntry[];
}

const TocSide = ({ tableOfContents }: TocSideProps) => {
  const [activeToc, setActiveToc] = useState('');

  useEffect(() => {
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          setActiveToc(entry.target.id);
        }
      });
    }, { rootMargin: '0px 0px -91% 0px', threshold: 0.1 });

    headings.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const isActiveToc = (url: string): boolean => {
    const targetId = url.substring(1);
    return activeToc === targetId;
  };
  
  return (
    <div className='min-h-[calc(100vh-1000px)] overflow-x-hidden overflow-y-visible whitespace-pre-wrap'>
      {tableOfContents.length > 0 &&
        (
          <ul className='content-toc mt-2 border-l-2 pl-3 flex flex-col'>
            <span className='text-slate-800/90 dark:text-slate-300 font-semibold pb-3'>On this page</span>
            {tableOfContents.map((item, index) => (
              <li key={index} className={`list-none pl-0 my-1.5 `}>
                <Link href={item.url} className={`text-sm no-underline pl-0 ${isActiveToc(item.url) ? 'content-toc-active' : ''}`}>
                  <span className="sr-only">Navigate to </span>{item.title}
                </Link>
                {item.items?.map((subItem, subIndex) => (
                  <ul key={subIndex} className='pl-4 my-px'>
                    <li className='list-none pl-0 my-1.5'>
                      <Link href={subItem.url} className={`text-sm no-underline pl-0 ${isActiveToc(subItem.url) ? 'content-toc-active' : ''}`}>
                        <span className="sr-only">Navigate to </span>{subItem.title}
                      </Link>
                    </li>
                  </ul>
                ))}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default TocSide;
