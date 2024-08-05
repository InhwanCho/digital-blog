import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCodeWrap from "@/lib/rehype-code-wrap";
import rehypeExternalLinks from "@/lib/rehype-external-links";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"), // 슬러그를 URL 파라미터 형태로 변환합니다.
  categories: data.slug.split("/").slice(1, -1), // 슬러그를 사용하여 카테고리 배열을 생성합니다.
});

const posts = defineCollection({
  name: "Post",
  pattern: "post/**/*.mdx",
  // 'post' 디렉토리와 그 하위에서 MDX 파일을 찾는 패턴을 정의합니다.
  schema: s
    .object({
      slug: s.path(), // 파일 경로에서 슬러그를 자동으로 생성합니다.
      title: s.string().max(99), // 최대 99자의 문자열을 갖는 제목 필드입니다.
      description: s.string().max(999).optional(), // 최대 999자의 선택적 설명 필드입니다.
      date: s.isodate(), // ISO 날짜 형식을 갖는 날짜 필드입니다.
      published: s.boolean().default(true), // 기본값이 true인 게시 상태 필드입니다.
      tags: s.array(s.string()).optional(), // 문자열 배열로, 선택적 태그 필드입니다.
      body: s.mdx(), // MDX 컨텐츠를 처리하는 필드입니다.
      toc: s.toc(), // 목차를 생성하는 필드입니다.
    })
    .transform(computedFields), // 위에서 정의한 computedFields 함수를 사용하여 추가 필드를 계산합니다.
});
export default defineConfig({
  root: "content",
  output: {
    data: ".velite", // MDX 파일에서 추출한 메타데이터를 저장할 디렉토리.
    assets: "public/static", // 정적 자산을 저장할 디렉토리.
    base: "/static/", // 정적 자산에 접근할 기본 경로.
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
      rehypeKatex, //수학 수식을 html로 파싱(css파일을 추가로 import 해야 제대로 적용)
    ],
    // 수학 수식 $$표시 에러안나게 math로 변환
    remarkPlugins: [remarkMath],
  },
});
