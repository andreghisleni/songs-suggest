import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sugestão de Músicas para Eventos | Bem-vindo!",
  description:
    "Crie a playlist perfeita para seus eventos coletando sugestões de músicas dos seus convidados de forma fácil e divertida.",
  keywords: "música, evento, playlist, sugestão, festa, DJ, spotify",
};

export default async function SelectTypePage() {
  // unstable_noStore();
  // const user = getCookie("user", { cookies });

  // if (!user) {
  //   return <div>Usuário não encontrado</div>;
  // }

  // const session = JSON.parse(user) as {
  //   id: string;
  //   name: string;
  //   email: string;
  //   role: string;
  // };

  // if (!session) {
  //   // redirect("/auth/sign-in");
  return (
    <>
      {/* Container principal da página */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-spotify-dark text-spotify-text p-4 font-['Montserrat',_sans-serif] overflow-hidden">
        {/* Conteúdo da Landing Page */}
        <main className="container mx-auto flex flex-col lg:flex-row items-center justify-around text-center lg:text-left py-12 lg:py-20 z-10">
          {/* Coluna de Texto e CTA */}
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              A{" "}
              <span className="text-spotify-green">Trilha Sonora Perfeita</span>{" "}
              para Seus Eventos Começa Aqui!
            </h1>
            <p className="text-lg sm:text-xl text-spotify-light-gray mb-8 leading-relaxed">
              Nosso sistema torna incrivelmente fácil coletar sugestões de
              músicas de todos os seus convidados. Crie eventos, compartilhe o
              link e deixe a mágica acontecer. Diga adeus às adivinhações e olá
              para uma playlist que todos vão amar!
            </p>
            {/* <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="/criar-evento"
                className="bg-spotify-green text-spotify-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-green-400 transition-transform transform hover:scale-105 shadow-lg"
                legacyBehavior
              >
                Criar Novo Evento
              </Link>
              <Link
                href="/encontrar-evento"
                legacyBehavior
                className="border-2 border-spotify-green text-spotify-green font-bold py-3 px-8 rounded-full text-lg hover:bg-spotify-green hover:text-spotify-dark transition-all transform hover:scale-105 shadow-lg"
              >
                Acessar um Evento
              </Link>
            </div> */}
          </div>

          {/* Coluna da Imagem/Ilustração */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-lg h-auto">
              <Image
                src="/image.png" // Ou o caminho local: /images/nome-da-sua-imagem.png
                alt="Ilustração de música e eventos"
                width={600} // Largura original ou desejada
                height={450} // Altura original ou desejada
                layout="responsive" // Torna a imagem responsiva mantendo a proporção
                className="rounded-lg shadow-2xl"
                priority // Carregar a imagem com prioridade (bom para LCP)
              />
            </div>
          </div>
        </main>

        {/* Elementos de fundo decorativos (opcional) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-spotify-green opacity-20 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse-slower" />
        </div>

        <footer className="w-full text-center py-8 mt-auto text-spotify-light-gray text-sm z-10">
          <p>
            &copy; {new Date().getFullYear()} Seu Sistema de Sugestão de
            Músicas. Todos os direitos reservados.
          </p>
          {/* Você pode adicionar links para Política de Privacidade, Termos, etc. aqui */}
        </footer>
      </div>
    </>
  );
  // }

  // if (session.role === "ADMIN") {
  //   redirect("/admin");
  // }
}
