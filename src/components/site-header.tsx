import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mobile-toggle";
import MainNav from "./main-nav";
import LinkExternal from "@/components/link-external";
import { IoLogoGithub } from "react-icons/io";
import { Button } from "./ui/button";
import { siteConfig } from "@/config/site";
import KBarButton from "@/components/kbar/kbar-button";

export default function NavBar() {

  return (
    <header className="z-10 sticky top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-14 max-w-screen-lg items-center justify-between">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-3">
          <nav className="sm:flex gap-5 hidden">
            <KBarButton/>
            <LinkExternal href={siteConfig.author.contacts.github}>
              <Button variant="ghost" className="w-10 px-0" >
                <IoLogoGithub className="size-6" />
              </Button>
            </LinkExternal>
          </nav>
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
