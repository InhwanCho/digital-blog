import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import Giscus from "@/components/giscus";
import TocSide from "@/components/toc-side";
import "@/css/prism.css";
import ReadingProgressBar from "@/components/reading-progress-bar";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import PostFooter from "@/components/post-footer";

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
  const postFooterProps = {
    prevPost: posts.at(postIndex - 1) ?? null,
    nextPost: posts.at(postIndex + 1) ?? null,
  };
  return { post, postFooterProps };
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

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author.name },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: siteConfig.locale
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
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
  const { post, postFooterProps } = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <section className="py-6 prose dark:prose-invert max-w-5xl h-full mx-auto container xl:flex xl:justify-center">
      <ReadingProgressBar />
      <article className="w-full h-full mx-auto xl:max-w-[980px] xl:flex-grow">
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
        <MDXContent code={post.body} />
        <hr className="my-4" />
        <PostFooter {...postFooterProps} />
        <hr className="my-4" />
        <Giscus />
      </article>
      <aside className="relative order-2 xl:grow w-full max-w-[210px] hidden xl:block pl-10">
        <TocSide tableOfContents={post.toc} />
      </aside>
    </section>
  );
}


