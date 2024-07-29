export const headerConfig = {};

export const siteConfig = {
  url: "https://digital-blog-eosin.vercel.app",
  title: "Inhwan's Digital Blog",
  description:
    "개발 탐구와 학습 내용을 기록하고 정리하는 블로그입니다. Next.js 14 버전의 앱 라우터와 Velite를 이용하여 정적으로 배포하였습니다.",
  copyright: "InhwanCho © All rights reserved.",
  applicationName: "Digital Blog",
  generator: "Next.js",
  // referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript", "Blog", "Web Development"],
  authors: [
    { name: "InhwanCho", url: "https://digital-blog-eosin.vercel.app" },
  ],
  creator: "InhwanCho",
  publisher: "InhwanCho",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  since: 2024,
  googleAnalyticsId: "",
  locale: "ko-KR",
  twitterHandle: "@wh_dlsghks",
  author: {
    name: "InhwanCho",
    photo:
      "https://github.com/InhwanCho/portfolio/assets/111936229/53aecb04-94b4-4e05-8711-81b14c3eccc7",
    bio: "Frontend Developer",
    contacts: {
      email: "wh_dlsghks@naver.com",
      github: "https://github.com/InhwanCho",
      portFolio: "https://portfolio-nu-nine-86.vercel.app/",
    },
  },
  menus: [
    {
      label: "Blog",
      path: "/post",
    },
    {
      label: "About",
      path: "https://political-rotate-326.notion.site/729d9735ee0a4c48b0c7275ceb75dcc0",
    },
    {
      label: "Categories",
      path: "/categories",
    },
    {
      label: "Puppies",
      path: "/gallery",
    },
    // {
    //   label: "Tags",
    //   path: "/tags",
    // },
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
