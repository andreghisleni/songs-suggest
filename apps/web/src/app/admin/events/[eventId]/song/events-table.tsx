"use client";

import React, { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useGetEventByIdWithSongsQuery,
  useOnSongAddedSubscription,
} from "@/generated/graphql";
import { columns, Song } from "./columns";

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
  // const { data: initData, refetch } = useGetEventByIdWithSongsQuery({
  //   variables: {
  //     id: eventId,
  //   },
  // });

  // const { data: updateData, loading } = useOnSongAddedSubscription({
  //   variables: {
  //     eventId,
  //   },
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [refetch]);

  // const { totalPages, total, navigateToPage, setPageSize, showing } =
  //   usePagination({
  //     total: initData?.event.totalSales,
  //     pageSize,
  //     showing: initData?.event.sales.length,
  //   });

  // const songs = updateData?.songAdded
  //   ? [
  //       ...(initData?.event.songs.filter(
  //         (item) => item.id !== updateData?.songAdded.id,
  //       ) || []),
  //       updateData.songAdded,
  //     ]
  //   : initData?.event.songs || [];

  const {
    data: initData,
    loading: initLoading,
    refetch, // refetch pode ser usado para recarregar os dados iniciais
  } = useGetEventByIdWithSongsQuery({
    variables: {
      id: eventId,
    },
  });

  // Estado para armazenar a lista de músicas combinada
  const [songs, setSongs] = useState<Song[]>([]);

  // Efeito para carregar as músicas iniciais ou atualizá-las após um 'refetch'
  useEffect(() => {
    if (initData?.event?.songs) {
      // Define a lista de músicas com base nos dados da query.
      // Se 'refetch' for chamado, isso irá resetar 'songs' para os dados mais recentes do servidor.
      // Isso assume que 'refetch' busca a lista completa e atualizada.
      setSongs(initData.event.songs);
    } else if (!initLoading && initData) {
      // Se o carregamento terminou, 'initData' existe, mas não há músicas (ex: evento sem músicas)
      setSongs([]);
    }
  }, [initData, initLoading]); // Dependências: executa quando initData ou initLoading mudam

  const { data: updateData, loading: subscriptionLoading } =
    useOnSongAddedSubscription({
      variables: {
        eventId,
      },
    });

  // Efeito para adicionar músicas recebidas via subscription (WebSocket)
  useEffect(() => {
    if (updateData?.songAdded) {
      const newSong = updateData.songAdded as Song;
      setSongs((prevSongs) => {
        // Verifica se a música já existe na lista (pelo ID)
        const songExists = prevSongs.some((song) => song.id === newSong.id);
        if (!songExists) {
          // Se não existir, adiciona a nova música à lista existente
          return [...prevSongs, newSong];
        }
        // Se já existir, retorna a lista anterior (evita duplicatas)
        // Ou você pode implementar uma lógica para atualizar a música existente se necessário
        return prevSongs;
      });
    }
  }, [updateData?.songAdded]); // Dependência: executa quando uma nova música é adicionada via subscription

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Músicas
          {initLoading && " (Carregando lista inicial...)"}
          {!initLoading && ` (${songs.length})`}
          {/* Opcional: indicar status da subscrição
          {subscriptionLoading && " (Ouvindo atualizações...)"}
          */}
        </CardTitle>
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
