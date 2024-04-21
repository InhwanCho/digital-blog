import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import { Link } from 'next-view-transitions';
import { PostItem } from "@/components/post-item";
import { IoLogoGithub } from "react-icons/io";

export default function Home() {

  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container flex flex-col gap-4 text-center ">
          <h1 className="text-3xl sm:text-5xl font-black text-balance">
            {siteConfig.title}
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            {siteConfig.description}
          </p>
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

      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6">
        <h2 className="text-3xl font-black text-center">
          최신 포스트
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li key={post.slug} className="first:border-t border-border border-b last:border-none">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
