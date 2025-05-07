import { getCookie } from 'cookies-next';
import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Selecionar o tipo de acesso',
};

export default async function SelectTypePage() {
  unstable_noStore();
  const user = getCookie('user', { cookies });

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  const session = JSON.parse(user) as {
    id: string;
    name: string;
    email: string;
    role: string;
  };

  if (!session) {
    redirect('/auth/sign-in');
  }

  if (session.role === 'ADMIN') {
    redirect('/admin');
  }
}
