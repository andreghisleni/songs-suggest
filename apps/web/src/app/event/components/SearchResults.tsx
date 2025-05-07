// components/SearchResults.tsx
export interface Track {
  id: string;
  name: string;
  artist: string;
  albumArtUrl?: string;
}

interface SearchResultsProps {
  results: Track[];
  onSuggest: (track: Track) => void;
}

export default function SearchResults({
  results,
  onSuggest,
}: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Resultados da Busca:
      </h2>
      <ul className="space-y-2">
        {results.map((track) => (
          <li
            key={track.id}
            className="flex items-center justify-between p-3 bg-spotify-gray hover:bg-gray-700 rounded-md transition-colors group"
          >
            <div className="flex items-center space-x-4 overflow-hidden">
              {track.albumArtUrl && (
                <img
                  src={track.albumArtUrl}
                  alt={`Capa de ${track.name}`}
                  className="w-12 h-12 rounded object-cover" // Spotify usa capas quadradas
                />
              )}
              <div className="overflow-hidden">
                <p className="font-medium text-white truncate group-hover:text-spotify-green">
                  {track.name}
                </p>
                <p className="text-sm text-spotify-light-gray truncate">
                  {track.artist}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSuggest(track)}
              className="ml-4 px-4 py-2 bg-spotify-green hover:bg-green-500 text-white text-sm font-semibold rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Sugerir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
