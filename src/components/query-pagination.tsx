'use client';
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

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
        <PaginationItem>
          <PaginationPrevious
            href={prevPage >= 1 ? createPageUrl(prevPage) : undefined}
            onClick={(e) => {
              // Prevent clicking on the link if it's the first page
              if (currentPage === 1) {
                e.preventDefault();
              }
            }}
            style={{
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          />
        </PaginationItem>

        {/* Display page info with format 1/n when there are more than 2 pages */}
        {totalPages > 2 && (
          <PaginationItem className="hidden sm:inline-block">
            <span className="text-sm text-muted-foreground">{`${currentPage}/${totalPages}`}</span>
          </PaginationItem>
        )}

        {nextPage <= totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageUrl(nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
