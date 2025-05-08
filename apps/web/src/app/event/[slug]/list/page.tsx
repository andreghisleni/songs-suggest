"use client";

import {
  GetEventBySlugWithSongsDocument,
  useCreateSongMutation,
  useGetEventBySlugWithSongsQuery,
  useOnSongUpdatedSubscription,
  useSearchSpotifySongsMutation,
} from "@/generated/graphql";
import { useToast } from "@/components/ui/use-toast";
import { getCookie } from "cookies-next";
import SongSearch from "../../components/SongSearch";
import SearchResults, { Track } from "../../components/SearchResults";
import SuggestedSongsList from "../../components/SuggestedSongsList";

export default function EventPage({ params }) {
  const { toast } = useToast();

  const name = getCookie("name");
  const id = getCookie("id");

  const { data } = useGetEventBySlugWithSongsQuery({
    variables: {
      slug: params.slug,
    },
  });

  const { data: updateData } = useOnSongUpdatedSubscription({
    variables: {
      eventId: data?.eventBySlug.id || "",
    },
    skip: !data?.eventBySlug.id,
  });

  const event = data?.eventBySlug;

  const songs = (
    updateData?.songUpdated
      ? [
          ...(event?.songs.filter(
            (item) => item.id !== updateData?.songUpdated.id,
          ) || []),
          updateData?.songUpdated,
        ]
      : event?.songs || []
  ).filter((song) => !song.isPlayed && !song.isRejected);

  songs.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate.getTime() - bDate.getTime();
  });

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
    if (!event) return;

    suggestSong({
      variables: {
        input: {
          name: track.name,
          artist: track.artist,
          image: track.image,
          eventId: event.id,
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

      <SuggestedSongsList songs={songs} id={(id as string | undefined) || ""} />
    </div>
  );
}
