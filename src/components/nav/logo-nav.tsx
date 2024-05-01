import { siteConfig } from '@/config/site';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

export default function LogoNav() {
  return (
    <nav className="flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2 font-bold ">
        <Image alt='logo image' width={30} height={30} src='/static/favicons/apple-touch-icon.png' quality={100} />
        <strong className='inline-block sm:text-base text-sm'>{siteConfig.title}</strong>
      </Link>
    </nav>
  );
}
