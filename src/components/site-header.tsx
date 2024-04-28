import { MobileNav } from "@/components/nav/mobile-nav";
import { ModeToggle } from "@/components/nav/mobile-toggle";
import MainNav from "./nav/main-nav";
import LinkExternal from "@/components/link-external";
import { IoLogoGithub } from "react-icons/io";
import { Button } from "./ui/button";
import { siteConfig } from "@/config/site";
import KBarButton from "@/components/kbar/kbar-button";
import LogoNav from "./nav/logo-nav";


export default function NavBar() {

  return (
    <header className="z-10 sticky top-0 w-full bg-white bg-background/95 dark:bg-background/95 px-40">
      <div className="container flex h-14 items-center justify-between">
        <LogoNav/>
        <MainNav />
        <div className="flex items-center justify-end space-x-3">
          <nav className="sm:flex gap-5 hidden">
            <KBarButton />
            {/* 깃허브 */}
            <LinkExternal href={siteConfig.author.contacts.github}>
              <Button variant="ghost" className="w-10 px-0" >
                <IoLogoGithub className="size-6" />
              </Button>
            </LinkExternal>
          </nav>
          {/* 모바일 UI */}
          <ModeToggle />
          <MobileNav />          
        </div>
      </div>
    </header>
  );
}


        