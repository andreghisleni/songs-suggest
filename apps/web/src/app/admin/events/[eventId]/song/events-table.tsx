"use client";

import React, { useEffect } from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useGetEventByIdWithSongsQuery,
  useOnSongAddedSubscription,
} from "@/generated/graphql";
import { columns } from "./columns";

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
  eventId: string;
};

export function EventsTable({
  eventId,
  pageIndex,
  pageSize,
  filterFilter,
}: Props) {
  // const pageIndex = 0;
  // const pageSize = 40000;
  // const filterFilter = undefined;
  const { data: initData, refetch } = useGetEventByIdWithSongsQuery({
    variables: {
      id: eventId,
    },
  });

  const { data: updateData, loading } = useOnSongAddedSubscription({
    variables: {
      eventId,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  // const { totalPages, total, navigateToPage, setPageSize, showing } =
  //   usePagination({
  //     total: initData?.event.totalSales,
  //     pageSize,
  //     showing: initData?.event.sales.length,
  //   });

  const songs = updateData?.songAdded
    ? [
        ...(initData?.event.songs.filter(
          (item) => item.id !== updateData?.songAdded.id,
        ) || []),
        updateData.songAdded,
      ]
    : initData?.event.songs || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Músicas {loading ? "true" : "nao"}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={songs || []}
          // filterComponent={<FilterBase />}
          // ifJustFilterComponent
          // paginationComponent={
          //   <Suspense fallback={null}>
          //     <Pagination
          //       {...{
          //         items: total,
          //         page: pageIndex,
          //         pages: totalPages,
          //         limit: pageSize,
          //         showing,
          //         handleUpdatePage: (p) => {
          //           navigateToPage(p);
          //         },
          //         handleChangeLimit: (l) => {
          //           setPageSize(`${l}`);
          //         },
          //       }}
          //     />
          //   </Suspense>
          // }
        />
      </CardContent>
    </Card>
  );
}
