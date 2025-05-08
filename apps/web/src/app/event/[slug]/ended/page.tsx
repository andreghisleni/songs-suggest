"use client";

import {
  useGetEventBySlugWithSongsQuery,
  useOnEventUpdatedSubscription,
} from "@/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EndedPage({ params }) {
  const router = useRouter();

  const { data: queryData, loading: queryLoading } =
    useGetEventBySlugWithSongsQuery({
      variables: {
        slug: params.slug,
      },
    });

  const eventId = queryData?.eventBySlug?.id;
  const event = queryData?.eventBySlug;

  const { data: eventUpdatedData } = useOnEventUpdatedSubscription({
    variables: {
      slug: params.slug || "",
    },
    skip: !params.slug,
  });

  useEffect(() => {
    if (eventUpdatedData?.eventUpdated) {
      const e = eventUpdatedData.eventUpdated;
      if (e.isOpenedToReceiveSuggestions === true) {
        router.push(`./list`);
      }
    }
  }, [eventUpdatedData?.eventUpdated, params.slug, router]);

  useEffect(() => {
    if (event?.isOpenedToReceiveSuggestions === true) {
      router.push(`./list`);
    }
  }, [event?.isOpenedToReceiveSuggestions, params.slug, router]);

  if (queryLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex items-center justify-center bg-spotify-dark text-spotify-text font-['Montserrat',_sans-serif]">
      <div className="bg-spotify-light-dark p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Evento Encerrado</h1>
        <p className="text-gray-400 mb-8">
          Este evento foi encerrado e não está mais aceitando sugestões de
          músicas.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="bg-spotify-green hover:bg-spotify-light-green text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Voltar para a Página Inicial
          </Link>
          {/* <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Ver Playlist Final (se disponível)
          </button> */}
        </div>
      </div>
    </div>
  );
}
