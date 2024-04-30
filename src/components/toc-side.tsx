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
    <div className='fixed top-40 w-[240px] h-[calc(100vh-100px)] overflow-x-hidden overflow-y-auto'>
      <span className='text-slate-800/90 dark:text-slate-300 font-semibold'>On this page</span>
      {tableOfContents.length > 0 &&

        (
          <ul className='content-toc mt-2'>
            {tableOfContents.map((item, index) => (
              <li key={index} className={`list-none pl-0`}>
                <Link href={item.url} className={`text-sm no-underline pl-0 ${isActiveToc(item.url) ? 'content-toc-active' : ''}`}>
                  {item.title}
                </Link>
                {item.items?.map((subItem, subIndex) => (
                  <ul key={subIndex} className='pl-4'>
                    <li className='list-none pl-0'>
                      <Link href={subItem.url} className={`text-sm no-underline pl-0 ${isActiveToc(subItem.url) ? 'content-toc-active' : ''}`}>
                        {subItem.title}
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
