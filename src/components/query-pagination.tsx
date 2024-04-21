'use client';
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Link } from "next-view-transitions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QueryPaginationProps {
  totalPages: number;
  className?: string
}

export function QueryPagination({ totalPages, className }: QueryPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className={className}>
      <PaginationContent className="space-x-5">
        {prevPage >= 1 && (
          <PaginationItem>
            <Link
              className="flex items-center text-sm"
              href={createPageUrl(prevPage)}
              onClick={(e) => {
                // 첫 페이지일 경우 클릭을 막습니다.
                if (currentPage === 1) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              style={{
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              PrevPage
            </Link>
          </PaginationItem>
        )}

        {/* Display page info with format 1/n when there are more than 2 pages */}
        {totalPages > 2 && (
          <PaginationItem className="hidden sm:inline-block">
            <span className="text-sm text-muted-foreground">{`${currentPage}/${totalPages}`}</span>
          </PaginationItem>
        )}

        {nextPage <= totalPages && (
          <PaginationItem>
            <Link href={createPageUrl(nextPage)} className="flex items-center text-sm">nextPage
              <span className=""><ChevronRight className="h-4 w-4" /></span>
            </Link>            
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
