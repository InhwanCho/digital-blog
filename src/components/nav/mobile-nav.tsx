"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import LinkExternal from "@/components/link-external";
import { IoLogoGithub } from "react-icons/io";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center font-semibold pb-3"
        >
          <span className=" underline-link hover:text-slate-700/95 dark:hover:text-slate-300/90 transition-all">{siteConfig.title}</span>
        </MobileLink>
        <nav className="flex flex-col gap-3.5 mt-6">
          {siteConfig.menus.map((menu) => (
            <MobileLink onOpenChange={setOpen} href={menu.path} key={menu.label}>
              <span className="underline-link hover:font-semibold transition-all">{menu.label}</span>
            </MobileLink>
          ))}
          <LinkExternal href={siteConfig.author.contacts.github} className="flex items-center gap-3 mt-1">
            <IoLogoGithub className="size-5" />
            <span className="">Github</span>
            <span className="sr-only">깃허브 링크버튼</span>
          </LinkExternal>
          
        </nav>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
