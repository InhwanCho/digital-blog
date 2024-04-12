import LinkExternal from "@/components/link-external";
import { siteConfig } from "@/config/site";
import { useMemo } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { IoMail } from "react-icons/io5";



export default function Footer() {
  const since = useMemo(() => {
    const year = new Date().getFullYear();
    if (siteConfig.since === year) {
      return year;
    }
    return `${siteConfig.since}-${year}`;
  }, []);
  return (
    <footer className="pb-8 text-sm container max-w-5xl py-6 lg:py-10 text-neutral-800 dark:text-neutral-400">
      <hr className="mb-8" />

      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-3">
          <LinkExternal href={`mailto:${siteConfig.author.contacts.email}`}>
            <IoMail className="size-6" />
          </LinkExternal>
          <LinkExternal href={siteConfig.author.contacts.github}>
            <IoLogoGithub className="size-6" />
          </LinkExternal>
        </div>
        <p>
          <span>© {since} </span>
          <span className="text-primary cursor-pointer transition hover:text-slate-500">{siteConfig.title}</span>
          <span> Powered by </span>
          <LinkExternal href="https://nextjs.org/">Next.js</LinkExternal>
          <span>, </span>
          <LinkExternal href="https://velite.js.org/">Velite</LinkExternal>
          <span>, </span>
          <LinkExternal href="https://vercel.com/">Vercel</LinkExternal>          
        </p>
        <p>{siteConfig.copyright}</p>
      </div>
    </footer>
  );
}
