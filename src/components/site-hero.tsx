import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React from 'react';
import { buttonVariants } from './ui/button';
import { IoLogoGithub } from 'react-icons/io';

export default function SiteHero() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
      <div className="container flex flex-col gap-4 text-center ">
        <h1 className="text-3xl sm:text-5xl font-black text-balance sm:pb-4">
          {siteConfig.title}
        </h1>
        <div className="max-w-[42rem] mx-auto text-slate-800 sm:text-lg text-balance space-y-2">
          <p>안녕하세요! <span className='text-blue-600/90'>지속적으로 성장하는 개발자</span> 조인환입니다.</p>
          <p>이 블로그는 개발하면서 학습한 내용을 기록하고 정리하는 공간입니다.</p>
          <p>기획부터 제작, 배포까지 모두 제 손으로 직접 만들었습니다.</p>
          <p><span className='text-blue-600/90'>Next.js 14 버전</span> 앱 라우터와 <span className='text-blue-600/90'>Velite</span>를 사용하여 정적으로 배포하였습니다.</p>
        </div>
        <div className="flex flex-col gap-4 justify-center sm:flex-row">
          <Link
            href="/post"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
          >
            포스트 구경하기
          </Link>
          <Link
            href={siteConfig.author.contacts.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-fit flex "
            )}
          >
            <span className="pr-2">GitHub</span>
            <IoLogoGithub className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
