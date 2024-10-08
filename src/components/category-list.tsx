'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllCategories, getCategories, getPostsByCategorySlug, sortCategoryByCount, sortPosts } from '@/lib/utils';
import { posts } from '#site/content';
import { Tag } from '@/components/tag';
import { PostItem } from '@/components/post-item';
import { IoFolderOpenOutline } from "react-icons/io5";
import { QueryPagination } from '@/components/query-pagination';
import { useSearchParams } from 'next/navigation';

const POSTS_PER_PAGE = 8;


export default function CategoryList() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;    
  // 상태의 타입을 string[]로 설정
  const categories = getAllCategories(posts);
  const categori = getCategories(posts);

  const sortedCategories = sortCategoryByCount(categories);
  const [selectedItems, setSelectedItems] = useState<string[]>(['FrontEnd', 'all']);
  const handleMenuItemClick = (index: number, itemName: string) => {
    // 선택된 항목 업데이트를 위해 기존 배열을 복사하고, 특정 인덱스의 값을 업데이트함
    const updatedItems = [...selectedItems];
    updatedItems[index] = itemName;
    setSelectedItems(updatedItems);
  };
  const sortedPosts = getPostsByCategorySlug(posts, undefined, selectedItems);
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/post">All Posts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className='outline-none hover:text-slate-800 dark:hover:text-slate-300'>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <IoFolderOpenOutline className='mr-2' />
                {selectedItems[0]}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {Object.keys(categori).map((item, index) => (
                  <DropdownMenuItem key={index} onSelect={() => handleMenuItemClick(0, item)}>{item}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          {
            categori[selectedItems[0]].length > 0 ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem className='outline-none hover:text-slate-800 dark:hover:text-slate-300'>
                  <DropdownMenu >
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <IoFolderOpenOutline className='mr-2' />
                      {selectedItems[1]}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" >
                      <DropdownMenuItem onSelect={() => handleMenuItemClick(1, 'all')}>all</DropdownMenuItem>
                      {categori[selectedItems[0]].map((item, i) => (
                        <DropdownMenuItem key={i} onSelect={() => handleMenuItemClick(1, item)}>{item}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              </>
            ) : null
          }

        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-6 flex flex-wrap gap-3">
        {sortedCategories?.map(category => <Tag isCategory key={category} count={categories[category]} tag={category} />)}
      </div>
      <div >
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
        <QueryPagination
          totalPages={totalPages}
          className="justify-end mt-4"
        />
      </div>
    </div>

  );
}
