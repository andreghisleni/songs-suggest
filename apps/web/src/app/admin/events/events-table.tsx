"use client";

import React, { Suspense } from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetAllEventsQuery } from "@/generated/graphql";
import { Pagination } from "@/components/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { FilterBase } from "@/components/filter-base";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { EventForm } from "./event-form";

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
};

export function EventsTable({ pageIndex, pageSize, filterFilter }: Props) {
  const { data, refetch } = useGetAllEventsQuery({
    variables: {
      filter: {
        filter: filterFilter,
        page: pageIndex,
        limit: pageSize,
      },
    },
  });

  const { totalPages, total, navigateToPage, setPageSize, showing } =
    usePagination({
      total: data?.getTotalEvents,
      pageSize,
      showing: data?.events.length,
    });

  const { toast } = useToast();
  const router = useRouter();

  // const [createEvent] = useCreateEventMutation({
  //   onCompleted: ({ createEvent: { id } }) => {
  //     refetch();
  //     toast({
  //       title: "Evento criado com sucesso",
  //     });
  //     router.push(`/admin/events/${id}/sales`);
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Erro ao criar evento",
  //     });
  //   },
  //   awaitRefetchQueries: true,
  //   refetchQueries: [GetAllEventsDocument],
  // });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.events || []}
          filterComponent={<FilterBase />}
          addComponent={<EventForm />}
          ifJustFilterComponent
          paginationComponent={
            <Suspense fallback={null}>
              <Pagination
                {...{
                  items: total,
                  page: pageIndex,
                  pages: totalPages,
                  limit: pageSize,
                  showing,
                  handleUpdatePage: (p) => {
                    navigateToPage(p);
                  },
                  handleChangeLimit: (l) => {
                    setPageSize(`${l}`);
                  },
                }}
              />
            </Suspense>
          }
        />
      </CardContent>
    </Card>
  );
}
