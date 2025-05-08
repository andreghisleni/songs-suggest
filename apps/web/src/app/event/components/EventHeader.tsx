// components/EventHeader.tsx
interface EventHeaderProps {
  eventName: string;
  bannerUrl: string | null;
  logoUrl: string | null;
  description?: string | null;
}

export default function EventHeader({
  eventName,
  bannerUrl,
  logoUrl,
  description,
}: EventHeaderProps) {
  return (
    <header className="relative text-white mb-8">
      {bannerUrl && (
        <div className="w-full h-48 md:h-64 lg:h-80 overflow-hidden">
          <img
            src={bannerUrl}
            alt={`Banner do evento ${eventName}`}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay para escurecer um pouco o banner e dar contraste ao texto/logo */}
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}

      <div
        className={`relative px-4 md:px-8 ${bannerUrl ? "-mt-16 md:-mt-24" : "pt-8"}`}
      >
        <div className="flex flex-col sm:flex-row items-center">
          {logoUrl && (
            <div className="mb-4 sm:mb-0 sm:mr-6">
              <img
                src={logoUrl}
                alt={`Logo do evento ${eventName}`}
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-spotify-light-dark shadow-lg"
              />
            </div>
          )}
          <div className="text-center sm:text-left">
            <p className="text-sm uppercase text-spotify-light-gray tracking-wider">
              Evento
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold break-words">
              {eventName}
            </h1>
            <p className="text-spotify-light-gray mt-1 text-lg">
              {description || "Descrição do evento não disponível."}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
