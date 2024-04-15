// import { NextSeo, DefaultSeo } from "next-seo";

export const headerConfig = {};

export const siteConfig = {
  url: "https://example.com",
  title: "Inhwan's Digital Blog",
  description: "개발하면서 탐구한 것을 기록하며 정리하는 블로그입니다.",
  copyright: "InhwanCho © All rights reserved.",
  since: 2024,
  googleAnalyticsId: "",
  locale: "ko-KR",
  author: {
    name: "InhwanCho",
    photo:
      "https://github.com/InhwanCho/portfolio/assets/111936229/53aecb04-94b4-4e05-8711-81b14c3eccc7",
    bio: "Frontend Engineer",
    contacts: {
      email: "wh_dlsghks@naver.com",
      github: "https://github.com/InhwanCho",
      portFolio: "https://portfolio-nu-nine-86.vercel.app/",
    },
  },
  menus: [
    {
      label: "Post",
      path: "/post",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Categories",
      path: "/categories",
    },
    {
      label: "Tags",
      path: "/tags",
    },
  ],
};

// export const seoConfig: DefaultSeo = {
//   title: siteConfig.title,
//   description: siteConfig.description,
//   canonical: siteConfig.url,
//   openGraph: {
//     type: "website",
//     locale: siteConfig.locale,
//     url: siteConfig.url,
//     siteName: siteConfig.title,
//   },
//   additionalMetaTags: [
//     {
//       name: "author",
//       content: siteConfig.author.name,
//     },
//   ],
// };
