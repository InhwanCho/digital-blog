import { siteConfig } from "@/config/site";
import { sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Metadata } from "next";
import SiteHero from "@/components/site-hero";

export const metadata: Metadata = {
  title: "Blog MainPage",
  description: siteConfig.description
};

export default function Home() {

  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <SiteHero />
      <section className="container max-w-4xl pb-6 flex flex-col space-y-6">
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
