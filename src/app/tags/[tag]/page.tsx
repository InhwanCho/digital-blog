import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { siteConfig } from "@/config/site";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
    category: string;
  }
}
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);  
  return {
    title: tag.toUpperCase(),
    description: `Posts on the topic of ${tag}`,
    keywords: [...siteConfig.keywords, tag],
  };
}

// export const generateStaticParams = () => {
//   const tags = getAllTags(posts);
//   const paths = Object.keys(tags).map(tag => ({ tag: slug(tag) }));
//   return paths;
// };


export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const title = tag.replace(/-/g, ' ');

  const displayPosts = getPostsByTagSlug(posts, tag);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-2xl md:text-3xl capitalize">Selected tag : <span className="text-muted-foreground uppercase">{title}</span></h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 ">
          <hr />
          {displayPosts?.length > 0 ? <ul className="flex flex-col ">
            {displayPosts.map((post) => {
              const { slug, date, title, description, tags } = post;
              return (
                <li key={slug} className="border-border border-b last:border-none">
                  <PostItem
                    slug={slug}
                    date={date}
                    title={title}
                    description={description}
                    tags={tags}
                  />
                </li>
              );
            })}
          </ul> : <p>No posts here yet</p>}

        </div>
        {/* <div className="flex flex-col space-y-4 col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map((t) => (
                <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
              ))}
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
