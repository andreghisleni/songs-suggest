import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PaginationProps {
  pages: number;
  items: number;
  page: number;
  limit: number;
  showing: number;
  handleUpdatePage: (page: number) => void;
  handleChangeLimit: (limit: number) => void;
}

export function Pagination({
  items,
  page,
  pages,
  limit,
  showing,
  handleUpdatePage,
  handleChangeLimit,
}: PaginationProps) {
  const firstPage = () => {
    handleUpdatePage(0);
  };

  const previousPage = () => {
    if (page - 1 < 0) {
      return;
    }
    handleUpdatePage(page - 1);
  };

  const nextPage = () => {
    if (page + 1 > pages) {
      return;
    }
    handleUpdatePage(page + 1);
  };

  const lastPage = () => {
    handleUpdatePage(pages);
  };

  const changeLimit = (value: string) => {
    handleChangeLimit(Number(value));
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 text-wrap text-sm md:flex-row md:gap-0">
      <span>
        Showing {showing} of {items} items
      </span>

      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-8">
        <div className="flex w-auto items-center gap-2">
          <span className="whitespace-no-wrap">Rows per page</span>

          <div className="w-20">
            <Select value={String(limit)} onValueChange={changeLimit}>
              <SelectTrigger aria-label="Page">
                <SelectValue placeholder="Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="200">200</SelectItem>
                <SelectItem value="300">300</SelectItem>
                <SelectItem value="400">400</SelectItem>
                <SelectItem value="500">500</SelectItem>
                <SelectItem value="600">600</SelectItem>
                <SelectItem value="700">700</SelectItem>
                <SelectItem value="800">800</SelectItem> <SelectItem value="1000">1000</SelectItem>
                <SelectItem value="900">900</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <span>
          Page {page + 1} of {pages + 1}
        </span>

        <div className="space-x-1.5">
          <Button onClick={firstPage} size="icon" disabled={page - 1 < 0}>
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button onClick={previousPage} size="icon" disabled={page - 1 < 0}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button onClick={nextPage} size="icon" disabled={page + 1 > pages}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button onClick={lastPage} size="icon" disabled={page + 1 > pages}>
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
