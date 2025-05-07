import { redirect } from 'next/navigation';

export default function Page({ params: { token } }: { params: { token: string } }) {
  redirect(`/auth/register/${token}`);
}
