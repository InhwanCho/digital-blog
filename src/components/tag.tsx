import { Link } from 'next-view-transitions';
import { slug } from "github-slugger";
import { badgeVariants } from "@/components/ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
  isCategory?: boolean;
}
export function Tag({ tag, current, count, isCategory }: TagProps) {
  
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`${isCategory ? `/categories/${slug(tag)}` : `/tags/${slug(tag)}`}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}
