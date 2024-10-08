
import { cn, formatDate } from "@/lib/utils";
import { Calendar, MoveRight } from "lucide-react";
import { Link } from 'next-view-transitions';
import { buttonVariants } from "@/components/ui/button";
import { Tag } from "@/components/tag";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {

  return (
    <article className="flex flex-col gap-2 py-3">      
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={"/" + slug}>{title}</Link>
        </h2>
      </div>
      <div className="flex gap-2">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      <div className="max-w-none text-slate-600 dark:text-slate-400">{description}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-2">
            <Calendar className="size-3" />
            <time className="text-sm" dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={"/" + slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0 gap-2")}
        >
          <span>Read more</span> <MoveRight className="size-3" />
          <span className="sr-only">navigate to {slug}</span>
        </Link>
      </div>
    </article>
  );
}
