'use client';

import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React from 'react';
import { usePathname } from "next/navigation";
import { siteConfig } from '@/config/site';

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-10">
      {siteConfig.menus.map((menu) => (
        <Link href={menu.path} key={menu.label}
          className={cn(
            "underline-link text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
            pathname === menu.path ? "text-foreground" : "text-foreground/60"
          )}>
          {menu.label}
        </Link>
      ))}
    </nav>
  );
}
