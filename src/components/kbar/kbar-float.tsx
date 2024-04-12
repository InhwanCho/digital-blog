import { useEffect, useState } from 'react';

export default function KbarFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    if (!observer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setShow(!entry.isIntersecting);
        },
        { threshold: 0.9 },
      );
    }

    const nav = document.querySelector('nav');

    if (nav) {
      observer.observe(nav);
    }
  }, []);

  return (
    <div
      className="bg-secondary fixed right-6 bottom-6 h-8 w-8 rounded p-2 active:opacity-80 sm:hidden"
      onClick={() => window.scrollTo({ top: 0 })}
      style={{ display: show ? '' : 'none' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9l6-6m0 0l6 6m-6-6v12a6 6 0 01-12 0v-3"
        />
      </svg>
    </div>
  );
}
