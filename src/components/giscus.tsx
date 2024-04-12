'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';

const Giscus = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark_tritanopia' : 'light_tritanopia';

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', 'https://giscus.app/client.js');
    scriptElement.setAttribute('data-repo', 'InhwanCho/giscus_blog');
    scriptElement.setAttribute('data-repo-id', 'R_kgDOLqJgiA');
    scriptElement.setAttribute('data-category', "Announcements");
    scriptElement.setAttribute('data-category-id', 'DIC_kwDOLqJgiM4CeeBI');
    scriptElement.setAttribute('data-mapping', 'pathname');
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'bottom');
    scriptElement.setAttribute('data-theme', theme);
    scriptElement.setAttribute('data-lang', 'ko');
    scriptElement.setAttribute('data-loading', 'lazy');
    scriptElement.setAttribute('crossorigin', 'anonymous');
    scriptElement.async = true;
    ref.current?.appendChild(scriptElement);
  }, [mounted, theme]);

  if (!mounted) return null;

  return <div ref={ref} />;
};

export default Giscus;