'use client';
import { Link } from 'next-view-transitions';
import { useEffect, useState, useRef } from 'react';

interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface TocSideProps {
  tableOfContents: TocEntry[];
}

const TocSide = ({ tableOfContents }: TocSideProps) => {
  // const observer = useRef<IntersectionObserver | null>(null);
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

  const renderToc = (toc: TocEntry[]): JSX.Element => (
    <ul className='content-toc'>
      {toc.map((item, index) => (
        <li key={index} className='marker:text-slate-600'>
          <Link href={item.url} className={`text-sm no-underline ${isActiveToc(item.url) ? 'content-toc-active' : ''}`}>
            {item.title}
          </Link>
          {item.items?.map((subItem, subIndex) => (
            <ul key={subIndex} className='pl-4'>
              <li className='marker:text-slate-600'>
                <Link href={subItem.url} className={`text-sm no-underline ${isActiveToc(subItem.url) ? 'content-toc-active' : ''}`}>
                  {subItem.title}
                </Link>
              </li>
            </ul>
          ))}
        </li>
      ))}
    </ul>
  );

  return (
    <div className='fixed top-4 pt-[80px] w-[240px] h-[calc(100vh-80px)] overflow-x-hidden overflow-y-auto'>
      <span className='text-slate-800/90 dark:text-slate-300'>On this page</span>
      {tableOfContents.length > 0 && (
        <ul className='content-toc mt-0'>{renderToc(tableOfContents)}</ul>
      )}
    </div>
  );
};

export default TocSide;
