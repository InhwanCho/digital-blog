import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories, sortCategoryByCount, getPostsByCategorySlug, getAllTags } from '@/lib/utils';
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
    category: string;
  }
}
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { category } = params;
  return {
    title: category,
    description: `Posts on the topic of ${category}`,
    category,
  };
}
export const generateStaticParams = () => {
  const categorys = getAllCategories(posts);
  const paths = Object.keys(categorys).map(category => ({ category: slug(category) }));
  return paths;
};

export default function CategoryPage({ params }: TagPageProps) {
  const { category } = params;  
  const title = category.split('-').join(' ');
  const displayPosts = getPostsByCategorySlug(posts, category);
  const categories = getAllCategories(posts);
  const sortedCategories = sortCategoryByCount(categories);
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-2xl md:text-3xl capitalize">Selected Category : <span className="text-muted-foreground">{title}</span></h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
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
        <div className="flex flex-col space-y-4 col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">

          <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedCategories?.map((t) => (
                <Tag tag={t} key={t} count={categories[t]} current={slug(t) === category} isCategory/>
              ))}
            </CardContent>
          </Card>

        </div>


      </div>
    </div>
  );
}
