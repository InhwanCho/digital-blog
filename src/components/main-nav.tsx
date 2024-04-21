'use client';

import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React from 'react';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2 font-bold ">
        <Image alt='logo image' width={30} height={30} src='/static/favicons/apple-touch-icon.png' quality={100} />
        <strong className='inline-block'>{siteConfig.title}</strong>
      </Link>
      <Link
        href="/post"
        className={cn(
          "underline-link text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/post" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={cn(
          "underline-link text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>
      <Link
        href="/categories"
        className={cn(
          "underline-link text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/categories" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Categories
      </Link>
      <Link
        href="/tags"
        className={cn(
          "underline-link text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/tags" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Tags
      </Link>
    </nav>
  );
}
