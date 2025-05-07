'use client';

import MercadoPagoLogo from '@/assets/mercado-pago.png';
import Image from 'next/image';
import * as Portal from '@radix-ui/react-portal';

import PixLogo from '@/assets/pix-icon.png';
import BoletoLogo from '@/assets/boleto.png';
import CartaoLogo from '@/assets/cartao.png';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { env } from '@/env';
import { PageParams } from './page';

type PaymentMessageProps = {
  responseData: PageParams['searchParams'];
  shortId: string;
  pendingPaymentLink: string;
};

export function PaymentMessage({ responseData, shortId, pendingPaymentLink }: PaymentMessageProps) {
  const showMessageButton =
    responseData.status === 'approved' ||
    responseData.status === 'pending' ||
    responseData.status === 'rejected';

  return (
    <Portal.Root
      className="z-500 pointer-events-auto fixed inset-0 isolation-auto flex h-full items-center justify-center overflow-y-auto p-8 text-gray-900 backdrop-blur-sm dark:text-gray-900"
      style={{
        pointerEvents: 'auto',
      }}
      tabIndex={-1}
    >
      <div className="max-w-96 space-y-6 rounded-lg bg-white p-8 shadow-lg">
        {responseData.payment_type === 'bank_transfer' && <Image src={PixLogo} alt="Pix" />}
        {responseData.payment_type?.endsWith('card') && <Image src={CartaoLogo} alt="Cartão" />}
        {responseData.payment_type === 'ticket' && <Image src={BoletoLogo} alt="Boleto bancário" />}
        {responseData.payment_type === 'account_money' && (
          <Image src={MercadoPagoLogo} alt="Mercado pago" />
        )}
        <h1 className="text-2xl font-semibold">
          Pagamento
          {responseData.status === 'approved'
            ? ' realizado com sucesso'
            : responseData.status === 'rejected'
              ? ' rejeitado'
              : ' pendente'}
        </h1>
        <h2>
          Pagamento com{' '}
          {responseData.payment_type === 'bank_transfer'
            ? 'PIX'
            : responseData.payment_type === 'credit_card'
              ? 'Cartão de Crédito'
              : responseData.payment_type === 'ticket'
                ? 'Boleto bancário'
                : responseData.payment_type === 'account_money'
                  ? 'Saldo Mercado Pago'
                  : 'Cartão de Débito'}
          {responseData.status === 'approved'
            ? ' aprovado com sucesso.'
            : responseData.status === 'rejected'
              ? ' rejeitado.'
              : ' pendente se você já fez o pagamento, aguarde a confirmação.'}
        </h2>

        {responseData.status === 'pending' && (
          <div className="space-y-2">
            <h2>Pagamento pendente, retorne ao link de pagamento.</h2>
            <Button asChild variant="outline" className="hover:cursor-pointer dark:bg-white">
              <Link href={pendingPaymentLink}>Retornar ao link de pagamento</Link>
            </Button>
          </div>
        )}
        {showMessageButton && (
          <div className="space-y-2">
            {responseData.status === 'pending' && (
              <h2>Se você já fez o pagamento, aguarde a confirmação.</h2>
            )}
            <Button asChild variant="outline" className="hover:cursor-pointer dark:bg-white">
              <Link
                href={`${env.NEXT_PUBLIC_VERCEL_URL}/s/${shortId}?t=${new Date().getTime()}`}
                replace
              >
                Voltar ao extrato
              </Link>
            </Button>
          </div>
        )}

        {/* <ShowJson data={data.saleByShortId.payments} /> */}
      </div>
    </Portal.Root>
  );
}
