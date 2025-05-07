// components/SongSearch.tsx
import { useState, FormEvent } from "react";
import { Search } from "lucide-react"; // Ícone opcional

interface SongSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SongSearch({ onSearch, isLoading }: SongSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label
        htmlFor="song-search-input"
        className="block text-sm font-medium text-spotify-light-gray mb-2"
      >
        Buscar Músicas no Spotify
      </label>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-grow w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />{" "}
            {/* Ícone de busca */}
          </div>
          <input
            id="song-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome da música ou artista"
            className="w-full p-3 pl-10 rounded-full bg-spotify-gray text-white placeholder-gray-500 focus:ring-2 focus:ring-spotify-green focus:outline-none focus:border-spotify-green transition-all"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className={`p-3 px-6 rounded-full font-semibold text-white transition-all duration-150 ease-in-out
            w-full sm:w-auto
            ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-spotify-green hover:bg-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none transform hover:scale-105"
            }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto" />
          ) : (
            "Buscar"
          )}
        </button>
      </div>
    </form>
  );
}
