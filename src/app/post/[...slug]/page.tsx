import dynamic from 'next/dynamic';
import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx/mdx-components";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";

import TocSide from "@/components/toc-side";
import "@/styles/prism.css";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import PostFooter from "@/components/post-footer";
import PostSeries from "@/components/post-series";
import "katex/dist/katex.min.css";


interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  // 날짜 순으로 정렬
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const post = posts.find((post) => post.slugAsParams === slug);
  const postIndex = posts.findIndex((post) => post.slugAsParams === slug);
  // 이전 포스트, 다음 포스트를 날짜 순으로 찾기
  const postFooterProps = {
    prevPost: posts.at(postIndex - 1) ?? null,
    nextPost: posts.at(postIndex + 1) ?? null,
  };
  // 일치하는 카테고리 찾기(마지막 slug는 파일 이름이여서 제거)
  const temslug = post?.slug.split('/');
  temslug?.pop();
  const series = posts.filter((post) => post.slug.startsWith(`${temslug?.join('/')}`)) ?? null;

  return { post, postFooterProps, series };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { post } = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);
  if (post.description) ogSearchParams.set("description", post.description);  
  return {
    title: post.title,
    description: post.description,
    category: post.categories[1],
    keywords: [...siteConfig.keywords, ...post.tags!],
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: {
        url: `/api/og?${ogSearchParams.toString()}`,
        alt: post.title,
      }
    }
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const Giscus = dynamic(()=> import("@/components/giscus"));
  const { post, postFooterProps, series } = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <section className="py-6 prose dark:prose-invert max-w-[950px] xl:max-w-[1200px] h-full mx-auto container xl:flex xl:justify-center">
      <article className="w-full h-full mx-auto xl:flex-grow">
        <header>
          <dl>
            <dt className="sr-only">Published On</dt>
            <dd className="text-sm sm:text-base font-medium flex items-center gap-2 pl-0">
              <Calendar className="size-3" />
              <time className="text-sm" dateTime={post.date}>{formatDate(post.date)}</time>
            </dd>
          </dl>
          <h1 className="mb-3.5">{post.title}</h1>
          <div className="flex gap-2.5 mb-2">
            {post.tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
          <hr className="my-4" />
        </header>
        <article className="flex flex-row">
          <div className="flex-1">
            <MDXContent code={post.body} />
          </div>
          <aside className="sticky mt-2 w-[240px] hidden xl:flex top-[120px] self-start pl-10 mb-4 pb-10">
            <TocSide tableOfContents={post.toc} />
          </aside>
        </article>
        <hr className="my-8" />
        <PostFooter {...postFooterProps} />
        <hr className="my-4" />
        <PostSeries series={series} current={post} />
        <hr className="my-4" />
        <Giscus />
      </article>
    </section>
  );
}