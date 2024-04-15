import { Metadata } from "next";
import { posts } from "#site/content";
import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { Tag } from "@/components/tag";

export const metadata: Metadata = {
  title: "Tags",
  description: "Blog tags I've written",
};

export default async function TagsPage() {
  
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-2xl md:text-3xl">Tags</h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-3">
        {sortedTags?.map(tag => <Tag key={tag} count={tags[tag]} tag={tag} />)}
      </div>
    </div>
  );
}
