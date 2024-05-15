'use client';

import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React from 'react';
import { usePathname } from "next/navigation";
import { siteConfig } from '@/config/site';

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden sm:flex items-center space-x-6 md:space-x-10">
      {siteConfig.menus.map((menu) => (
        <Link href={menu.path} key={menu.label}
          target={menu.label === 'About' ? '_blank' : ''}          
          className={cn(
            "underline-link text-sm font-medium transition-colors hover:text-primary sm:inline-block",
            pathname === menu.path ? "text-foreground font-semibold" : "text-foreground/60"
          )}>
          {menu.label}
        </Link>
      ))}
    </nav>
  );
}
