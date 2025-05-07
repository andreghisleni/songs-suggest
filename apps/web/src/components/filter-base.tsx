'use client';

import { Filter, Loader2, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function FilterBase() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPendingFilterTransition, startTransition] = useTransition();

  const [filterFilter, setNameFilter] = useState(searchParams.get('filterFilter') ?? '');

  function handleFilter(event: FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.set('filterFilter', filterFilter);

    params.set('pageIndex', '0');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleResetFilters() {
    setNameFilter('');

    const params = new URLSearchParams(searchParams);

    params.delete('filterFilter');

    router.push(`${pathname}?${params.toString()}`);
  }

  const hasFilters = filterFilter !== '';

  return (
    <form onSubmit={handleFilter} className="flex items-center gap-2">
      <Input
        value={filterFilter}
        onChange={e => setNameFilter(e.target.value)}
        placeholder="Filter..."
        className="h-8 w-full"
      />

      <Separator orientation="vertical" className="hidden h-6 md:block" />

      <div className="flex gap-2">
        <Button type="submit" size="sm" variant="secondary" disabled={!hasFilters}>
          {isPendingFilterTransition ? (
            <Loader2 className="mr-2 size-3 animate-spin" />
          ) : (
            <Filter className="size-3 md:mr-2" />
          )}
          <span className="hidden md:block">Filter</span>
        </Button>

        <Button
        onClick={handleResetFilters /* eslint-disable-line */}
          disabled={!hasFilters}
          type="button"
          size="sm"
          variant="outline"
        >
          <X className="size-3 md:mr-2" />
          <span className="hidden md:block">Reset</span>
        </Button>
      </div>
    </form>
  );
}
