"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventHeader from "../components/EventHeader";
import SongSearch from "../components/SongSearch";
import SearchResults, { Track } from "../components/SearchResults";
import SuggestedSongsList from "../components/SuggestedSongsList";

export interface SuggestedTrack extends Track {
  suggestedBy?: string;
  timestamp: Date;
}

export default function EventPage() {
  const router = useRouter();
  // const { id: eventId } = router.query;

  const eventId = "12345"; // ID do evento, substitua pelo ID real ou pela lógica de roteamento
  const [eventName, setEventName] = useState<string>("Carregando...");
  const [eventBannerUrl, setEventBannerUrl] = useState<string | null>(null);
  const [eventLogoUrl, setEventLogoUrl] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [suggestedSongs, setSuggestedSongs] = useState<SuggestedTrack[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      setEventName(`Festival de Música ${eventId}`);
      setEventBannerUrl("/banner-placeholder.jpg");
      setEventLogoUrl("/logo-placeholder.png");
      setSuggestedSongs([
        {
          id: "track1",
          name: "Bohemian Rhapsody",
          artist: "Queen",
          albumArtUrl:
            "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          suggestedBy: "Carlos",
          timestamp: new Date(),
        },
        {
          id: "track2",
          name: "Don't Stop Me Now",
          artist: "Queen",
          albumArtUrl:
            "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          suggestedBy: "Ana",
          timestamp: new Date(),
        },
      ]);
    }
  }, [eventId]);

  const handleSearch = async (query: string) => {
    // ... (lógica de busca como antes)
    if (!query.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setSearchResults([]);
    setTimeout(() => {
      const mockResults: Track[] = [
        {
          id: `spotify:track:id1${query}`,
          name: `Música Encontrada 1 para "${query}"`,
          artist: "Artista Famoso A",
          albumArtUrl:
            "https://i.scdn.co/image/ab67616d0000b273e0b0b0b0b0b0b0b0b0b0b0b0",
        },
        {
          id: `spotify:track:id2${query}`,
          name: `Outra Canção sobre "${query}"`,
          artist: "Banda Conhecida B",
          albumArtUrl:
            "https://i.scdn.co/image/ab67616d0000b273e0b0b0b0b0b0b0b0b0b0b0b0",
        },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestSong = (track: Track) => {
    // ... (lógica de sugestão como antes)
    const newSuggestion: SuggestedTrack = {
      ...track,
      timestamp: new Date(),
      suggestedBy: "Visitante",
    };
    if (!suggestedSongs.find((song) => song.id === newSuggestion.id)) {
      setSuggestedSongs((prev) => [newSuggestion, ...prev]);
    } else {
      alert("Essa música já foi sugerida!");
    }
    setSearchResults([]);
    const searchInput = document.getElementById(
      "song-search-input",
    ) as HTMLInputElement;
    if (searchInput) searchInput.value = "";
  };

  return (
    <>
      <Head>
        <title>Sugerir Músicas: {eventName}</title>
        <meta
          name="description"
          content={`Sugira músicas para o evento ${eventName}`}
        />
        {/* A importação da fonte Montserrat no CSS principal já deve ser suficiente se for global.
            Se não for global, e você quiser SÓ AQUI, poderia adicionar o <link> aqui também,
            mas o @import no CSS é geralmente mais limpo se a fonte for usada em vários lugares. */}
      </Head>

      {/* Aplicar o tema escuro e a fonte Montserrat (se desejado) ao contêiner principal DESTA PÁGINA */}
      <div className="min-h-screen bg-spotify-dark text-spotify-text font-['Montserrat',_sans-serif]">
        <EventHeader
          eventName={eventName}
          bannerUrl={eventBannerUrl}
          logoUrl={eventLogoUrl}
        />

        <main className="container mx-auto max-w-4xl p-4 md:p-6">
          {/* O conteúdo interno usará o bg-spotify-light-dark para contraste, como antes */}
          <div className="bg-spotify-light-dark p-6 md:p-8 rounded-lg shadow-xl">
            <SongSearch onSearch={handleSearch} isLoading={isLoading} />

            {error && <p className="text-red-500 text-center my-4">{error}</p>}

            {searchResults.length > 0 && (
              <SearchResults
                results={searchResults}
                onSuggest={handleSuggestSong}
              />
            )}

            <SuggestedSongsList songs={suggestedSongs} />
          </div>
        </main>

        <footer className="text-center py-8 text-xs text-gray-500">
          <p>Interface de sugestão de músicas. Evento: {eventName}</p>
        </footer>
      </div>
    </>
  );
}
