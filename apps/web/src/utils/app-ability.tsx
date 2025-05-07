import { Button } from '@/components/ui/button';
import { application } from '@full-stack/authorization';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';

export type PolicyAppHandlerCallback = (ability: application.AppAbility) => boolean;

export function AppAbilityCan(a: PolicyAppHandlerCallback) {
  const userRole = getCookie('user-role', { cookies });

  if (userRole) {
    try {
      const ur = JSON.parse(userRole);

      if (ur.id && ur.role) {
        const ability = application.defineAbilityFor({
          id: ur.id,
          role: ur.role,
        });

        if (!a(ability)) {
          throw new Error('Usuário não autorizado');
        }
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

export function AppAbilityCanBoolean(a: PolicyAppHandlerCallback) {
  const userRole = getCookie('user-role', { cookies });

  if (userRole) {
    try {
      const ur = JSON.parse(userRole);

      if (ur.id && ur.role) {
        const ability = application.defineAbilityFor({
          id: ur.id,
          role: ur.role,
        });

        if (!a(ability)) {
          throw new Error('Usuário não autorizado');
        }

        return true;
      }

      return true;
    } catch {
      return false;
    }
  }

  return false;
}
