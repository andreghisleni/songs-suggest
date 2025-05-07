// components/SuggestedSongsList.tsx
import { Music, UserCircle, Clock } from "lucide-react"; // Ícones opcionais
import { SuggestedTrack } from "../[slug]/page";

interface SuggestedSongsListProps {
  songs: SuggestedTrack[];
}

export default function SuggestedSongsList({ songs }: SuggestedSongsListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white border-b border-spotify-gray pb-3">
        Playlist do Evento ({songs.length})
      </h2>
      {songs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center bg-spotify-gray rounded-lg">
          <Music size={48} className="text-spotify-light-gray mb-4" />
          <p className="text-spotify-light-gray text-lg">
            Ainda não há músicas na playlist.
          </p>
          <p className="text-gray-500">
            Use a busca acima para sugerir as primeiras!
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {songs.map((song, index) => (
            <li
              key={`${song.id}-${index}`}
              className="flex items-center p-3 bg-spotify-gray hover:bg-gray-700/50 rounded-lg shadow transition-all"
            >
              <span className="text-sm text-gray-400 w-6 text-right mr-3">
                {index + 1}.
              </span>
              {song.albumArtUrl && (
                <img
                  src={song.albumArtUrl}
                  alt={`Capa de ${song.name}`}
                  className="w-14 h-14 rounded object-cover mr-4 shadow-md"
                />
              )}
              <div className="flex-grow overflow-hidden">
                <p className="text-base font-semibold text-white truncate">
                  {song.name}
                </p>
                <p className="text-sm text-spotify-light-gray truncate">
                  {song.artist}
                </p>
                {song.suggestedBy && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <UserCircle size={14} className="mr-1" />
                    <span>{song.suggestedBy}</span>
                    <Clock size={14} className="ml-2 mr-1" />
                    <span>
                      {song.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </div>
              {/* Futuro: Adicionar botão de play (simulado) ou mais ações */}
              {/* <button className="ml-auto p-2 text-spotify-light-gray hover:text-white">
                <MoreHorizontal size={20} />
              </button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
