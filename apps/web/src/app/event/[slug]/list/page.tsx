"use client";

import {
  GetEventBySlugWithSongsDocument,
  GetEventBySlugWithSongsQuery,
  useCreateSongMutation,
  useGetEventBySlugWithSongsQuery,
  useOnSongUpdatedSubscription,
  useSearchSpotifySongsMutation,
} from "@/generated/graphql";
import { useToast } from "@/components/ui/use-toast";
import { getCookie } from "cookies-next";
import { useEffect, useMemo, useState } from "react";
import SongSearch from "../../components/SongSearch";
import SearchResults, { Track } from "../../components/SearchResults";
import SuggestedSongsList from "../../components/SuggestedSongsList";

type Song = GetEventBySlugWithSongsQuery["eventBySlug"]["songs"][0];

export default function EventPage({ params }) {
  const { toast } = useToast();

  const name = getCookie("name");
  const id = getCookie("id");

  // const { data } = useGetEventBySlugWithSongsQuery({
  //   variables: {
  //     slug: params.slug,
  //   },
  // });

  // const { data: updateData } = useOnSongUpdatedSubscription({
  //   variables: {
  //     eventId: data?.eventBySlug.id || "",
  //   },
  //   skip: !data?.eventBySlug.id,
  // });

  // const event = data?.eventBySlug;

  // const songs = (
  //   updateData?.songUpdated
  //     ? [
  //         ...(event?.songs.filter(
  //           (item) => item.id !== updateData?.songUpdated.id,
  //         ) || []),
  //         updateData?.songUpdated,
  //       ]
  //     : event?.songs || []
  // ).filter((song) => !song.isPlayed && !song.isRejected);

  // songs.sort((a, b) => {
  //   const aDate = new Date(a.createdAt);
  //   const bDate = new Date(b.createdAt);
  //   return aDate.getTime() - bDate.getTime();
  // });

  const { data: queryData, loading: queryLoading } =
    useGetEventBySlugWithSongsQuery({
      variables: {
        slug: params.slug,
      },
    });

  const eventId = queryData?.eventBySlug?.id;

  const { data: updateData, loading: subscriptionLoading } =
    useOnSongUpdatedSubscription({
      variables: {
        eventId: eventId || "", // Garante que uma string seja passada, ou "" se eventId for undefined
      },
      skip: !eventId, // Pula a subscrição se eventId não estiver disponível
    });

  // Estado local para armazenar e gerenciar a lista de músicas
  const [songsList, setSongsList] = useState<Song[]>([]);

  // Efeito para carregar as músicas iniciais da query ou atualizar após refetch
  useEffect(() => {
    if (queryData?.eventBySlug?.songs) {
      // Define a lista de músicas com base nos dados da query
      setSongsList(queryData.eventBySlug.songs);
    } else if (!queryLoading && queryData) {
      // Carregamento concluído, queryData existe, mas não há músicas
      setSongsList([]);
    }
  }, [queryData, queryLoading]); // Dependências: executa quando queryData ou queryLoading mudam

  // Efeito para aplicar atualizações de músicas recebidas via subscription
  useEffect(() => {
    if (updateData?.songUpdated) {
      const updatedSong = updateData.songUpdated as Song;
      setSongsList((prevSongs) =>
        // Mapeia a lista anterior, substituindo a música atualizada pela sua nova versão
        prevSongs.map((song) =>
          song.id === updatedSong.id ? updatedSong : song,
        ),
      );
    }
  }, [updateData?.songUpdated]); // Dependência: executa quando uma música atualizada é recebida

  // Memoiza o processamento (filtragem e ordenação) da lista de músicas
  // Isso evita recálculos desnecessários a cada renderização se 'songsList' não mudou
  const processedSongs = useMemo(() => {
    // 1. Filtra as músicas
    const filtered = songsList.filter(
      (song) => !song.isPlayed && !song.isRejected,
    );

    // 2. Ordena as músicas filtradas pela data de criação
    //    É importante clonar o array antes de ordenar se a ordenação in-loco for um problema
    //    A função sort() modifica o array original.
    //    Para evitar isso em `filtered`, podemos fazer [...filtered].sort(...)
    //    ou confiar que `filter` já cria um novo array.
    filtered.sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();

      // Tratamento para datas inválidas (opcional, mas recomendado)
      if (Number.isNaN(aDate) && Number.isNaN(bDate)) return 0; // Ambas inválidas, considera igual
      if (Number.isNaN(aDate)) return 1; // Data 'a' inválida, joga para o fim
      if (Number.isNaN(bDate)) return -1; // Data 'b' inválida, joga para o fim (ou 1 para início)

      return aDate - bDate; // Ordena ascendentemente pela data
    });

    return filtered;
  }, [songsList]); // Recalcula apenas quando 'songsList' (o estado) muda

  console.log("songsList", songsList);
  console.log("processedSongs", processedSongs);

  const search = useSearchSpotifySongsMutation();

  const [suggestSong] = useCreateSongMutation({
    onCompleted: (d) => {
      toast({
        title: "Música sugerida com sucesso!",
        description: `A música "${d.createSong.name}" foi sugerida.`,
        duration: 3000,
      });

      search[1].reset();
      const searchInput = document.getElementById(
        "song-search-input",
      ) as HTMLInputElement;
      if (searchInput) searchInput.value = "";
    },
    onError: (e) => {
      toast({
        title: "Erro ao sugerir música",
        description: e.message,
        variant: "destructive",
      });
    },
    refetchQueries: [GetEventBySlugWithSongsDocument],
  });

  const handleSearch = async (query: string) => {
    await search[0]({
      variables: {
        query,
      },
    });
  };

  const handleSuggestSong = (track: Track) => {
    if (!eventId) return;

    suggestSong({
      variables: {
        input: {
          name: track.name,
          artist: track.artist,
          image: track.image,
          eventId,
          suggestedByName: (name as string | undefined) || "",
          suggestedById: (id as string | undefined) || "", // TODO: Get user ID from context
          spotifyId: track.id,
          duration: track.duration_ms,
        },
      },
    });
  };

  return (
    <div className="bg-spotify-light-dark p-6 md:p-8 rounded-lg shadow-xl">
      <SongSearch onSearch={handleSearch} isLoading={search[1].loading} />

      {search[1].error && (
        <p className="text-red-500 text-center my-4">
          {search[1].error.message}
        </p>
      )}

      {search[1].data?.searchSpotify &&
        search[1].data?.searchSpotify.length > 0 && (
          <SearchResults
            results={search[1].data?.searchSpotify}
            onSuggest={handleSuggestSong}
          />
        )}

      <SuggestedSongsList
        songs={processedSongs}
        id={(id as string | undefined) || ""}
      />
    </div>
  );
}
