import { siteConfig } from "@/config/site";
import { MetadataRoute } from "next";
import { posts } from "#site/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url;

  // const routes = siteConfig.menus.map((menu) => ({
  //   url: `${siteUrl}${menu.path}`,
  //   lastModified: new Date().toISOString().split("T")[0],
  //   changeFrequency: "weekly" as "weekly",
  //   priority: 0.5,
  // }));

  const blogRoutes = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${siteUrl}/${post.slug}`,
      lastModified: post.date.split("T")[0],
      priority: 1,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 1,
    },
    // ...routes,
    ...blogRoutes,
  ];
}
