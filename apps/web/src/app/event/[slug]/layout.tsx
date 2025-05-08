import { clientWithOutAuth } from "@/services/apollo";
import {
  GetEventBySlugDocument,
  GetEventBySlugQuery,
} from "@/generated/graphql";
import { Metadata } from "next";
import EventHeader from "../components/EventHeader";

export async function generateMetadata({
  params: { slug },
}: Readonly<{
  params: { slug: string };
}>): Promise<Metadata> {
  try {
    const { data } = await clientWithOutAuth.query<GetEventBySlugQuery>({
      query: GetEventBySlugDocument,
      variables: {
        slug,
      },
      fetchPolicy: "cache-first",
    });
    const event = data?.eventBySlug;
    const eventName = event?.name;
    const eventDescription = event?.description;
    const eventLogo = event?.logo;
    const eventBanner = event?.banner;

    return {
      title: {
        template: `%s | Sugerir Músicas: ${eventName}`,
        absolute: `Sugerir Músicas: ${eventName}`,
      },
      description: eventDescription,
      openGraph: {
        title: eventName,
        description: eventDescription,
        siteName: "Postite",
        images: [
          {
            url: eventLogo,
            width: 150,
            height: 150,
            alt: eventName,
          },
          {
            url: eventBanner,
            width: 1200,
            height: 300,
            alt: eventName,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: {
        absolute: "Sugerir Músicas",
      },
    };
  }
}

export default async function AppLayout({
  children,
  params: { slug },
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  // const userRole = getCookie("user-role", { cookies });

  try {
    const { data } = await clientWithOutAuth.query<GetEventBySlugQuery>({
      query: GetEventBySlugDocument,
      variables: {
        slug,
      },
      fetchPolicy: "cache-first",
    });

    const event = data?.eventBySlug;

    return (
      <div className="min-h-screen bg-spotify-dark text-spotify-text font-['Montserrat',_sans-serif]">
        <EventHeader
          eventName={event?.name}
          bannerUrl={event?.banner}
          logoUrl={event?.logo}
          description={event?.description}
        />

        <main className="container mx-auto max-w-4xl p-4 md:p-6">
          {children}
        </main>

        <footer className="text-center py-8 text-xs text-gray-500">
          <p>Interface de sugestão de músicas. Evento: {event?.name}</p>
        </footer>
      </div>
    );
  } catch {
    return (
      <div className="flex items-center justify-center h-screen bg-spotify-dark text-spotify-text font-['Montserrat',_sans-serif]">
        <div className="bg-spotify-light-dark p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Evento Não Encontrado</h1>
          <p className="text-gray-400 mb-8">
            Lamentamos, mas o evento que você procura não foi encontrado.
          </p>
          <div className="space-x-4">
            <button
              className="bg-spotify-green hover:bg-spotify-light-green text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Voltar para a Página Inicial
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Contactar Suporte
            </button>
          </div>
        </div>
      </div>
    );
  }
}
