"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import LinkExternal from "./link-external";
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
          {siteConfig.author.name}
        </MobileLink>
        <div className="flex flex-col gap-2.5 mt-3">
          <MobileLink onOpenChange={setOpen} href="/post">
            Blog
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/categories">
            Categories
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/tags">
            Tags
          </MobileLink>
          <LinkExternal href={siteConfig.author.contacts.github} className="flex items-center gap-2">
            <IoLogoGithub className="size-6" />
            <span className="">Github</span>
          </LinkExternal>
        </div>
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
