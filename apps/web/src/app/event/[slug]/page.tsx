"use server";

import { randomUUID } from "crypto";
import { User } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params: { slug } }) {
  const isLoading = false; // Simulando o estado de carregamento

  const cookieStore = cookies();

  const n = cookieStore.get("name");
  const id = cookieStore.get("id");

  if (n && id) {
    redirect(`./${slug}/list`);
  }

  async function handleSubmit(data: FormData) {
    "use server";

    const name = data.get("name") as string;

    if (!name) {
      return;
    }

    const cs = cookies();

    // Set cookie
    cs.set("name", name);
    cs.set("id", randomUUID());
  }

  return (
    <div className="bg-spotify-light-dark p-6 md:p-8 rounded-lg shadow-xl">
      <form action={handleSubmit} className="mb-8" method="post">
        <label
          htmlFor="song-search-input"
          className="block text-sm font-medium text-spotify-light-gray mb-2"
        >
          Qual o seu nome?
        </label>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-grow w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={20} className="text-gray-400" />{" "}
              {/* Ícone de busca */}
            </div>
            <input
              id="song-search-input"
              type="text"
              placeholder="Seu nome"
              className="w-full p-3 pl-10 rounded-full bg-spotify-gray text-white placeholder-gray-500 focus:ring-2 focus:ring-spotify-green focus:outline-none focus:border-spotify-green transition-all"
              name="name"
              minLength={4}
              required
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
              "Enviar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
