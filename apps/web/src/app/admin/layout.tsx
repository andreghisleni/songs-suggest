import { application } from "@full-stack/authorization";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getUserServer } from "@/utils/get-server";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";

import { BreadcrumbSidebar } from "@/components/sidebar/breadcrumb-sidebar";
import { SideNavAdminItens } from "./constants-new";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRole = getCookie("user-role", { cookies });

  const user = getUserServer();

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }
  if (userRole) {
    try {
      const ur = JSON.parse(userRole);

      if (ur.id && ur.role) {
        const groups = SideNavAdminItens({
          app: {
            user: {
              id: ur?.id || "",
              role: (ur?.role as application.Role) || "DEFAULT",
            },
          },
        });

        // const userAvatarMenuItems = USER_AVATAR_MENU_ITEMS(user);

        return (
          <SidebarProvider>
            <AppSidebar groups={groups} userAvatarMenuItens={[]} user={user} />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <BreadcrumbSidebar groups={groups} />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
                {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 md:min-h-min" /> */}
              </div>
            </SidebarInset>
          </SidebarProvider>
        );
      }
    } catch {
      return (
        <div className="bg-card mx-auto my-auto flex max-w-md flex-col items-center rounded-lg p-8 shadow-md">
          <h1 className="text-destructive mb-4 text-4xl font-bold">401</h1>
          <h2 className="mb-4 text-2xl font-semibold">Não Autorizado</h2>
          <p className="text-muted-foreground mb-6 text-center">
            Você não tem permissão para acessar esta página.
          </p>
          <Button asChild>
            <Link href="/">Voltar para a Página Inicial</Link>
          </Button>
        </div>
      );
    }
  }
}
