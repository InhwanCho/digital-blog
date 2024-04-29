import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import remarkMath from "remark-math";

import rehypeCodeWrap from "@/lib/rehype-code-wrap";
import rehypeExternalLinks from "@/lib/rehype-external-links";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
  categories: data.slug.split("/").slice(1, -1),
});

const posts = defineCollection({
  name: "Post",
  pattern: "post/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
      toc: s.toc(),
    })
    .transform(computedFields),
});
export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      // 슬러그(경로)
      rehypeSlug,
      // [rehypeToc, { nav: true, headings: ["h1", "h2"], position: "afterend" }],
      // 코드 커스텀
      rehypeCodeWrap,
      // 코드 스타일 prism.css
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      // link에 id태그와 arialLabel달고, class .subheading-anchor 생성
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      // a태그에 target='_blank' 달기
      rehypeExternalLinks,
    ],
    // $$표시 에러안나게 math로 변환 - 추후 latex 수정해야됨
    remarkPlugins: [remarkMath],
  },
});
