'use client';

import { format } from 'date-fns';

import Image from 'next/image';
import { formatToBRL } from '@/utils/formatToBRL';
import LogoMarconImg from '@/assets/logo-marcon.png';

import { useGetSaleWithShortIdQuery } from '@/generated/graphql';
import { Loader2 } from 'lucide-react';
import { GetSaleWithExternalIdQuery } from '@/generated/graphql-gestao';
import { PaymentInfo } from './payment-info';
import { ButtonPrint } from './button-print';
import { PaymentMessage } from './payment-message';
import { PageParams } from './page';

const fDate = (da: string | null | Date) => {
  if (!da) return '';
  if (da === 'null') return '';
  const d = new Date(da);
  d?.setDate(d.getDate() + 1);

  return d ? format(d, 'dd/MM/yyyy') : '';
};

type ExtractProps = {
  shortId: string;
  sale: GetSaleWithExternalIdQuery['sale'];
  searchParams: PageParams['searchParams'];
  message: string;
};

export function Extract({ shortId, sale, searchParams, message }: ExtractProps) {
  const { data, loading } = useGetSaleWithShortIdQuery({ variables: { shortId } });

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-24 w-24 animate-spin" />
      </div>
    );
  if (!data) return null;

  const totalReceived =
    (sale.salePayments?.reduce((acumulador, produto) => acumulador + produto.value, 0) || 0) +
    data.saleByShortId.payments
      .filter(pa => pa.status !== 'REJECTED')
      .reduce((acumulador, produto) => acumulador + produto.value, 0);

  const totalReceivedWithOutPending =
    (sale.salePayments?.reduce((acumulador, produto) => acumulador + produto.value, 0) || 0) +
    data.saleByShortId.payments
      .filter(pa => pa.status !== 'REJECTED')
      .filter(pa => pa.status !== 'PENDING')
      .reduce((acumulador, produto) => acumulador + produto.value, 0);

  const totalPayments = sale.salePayments?.reduce((acc, payment) => acc + payment.value, 0) || 0;

  const totalProducts =
    sale.saleItens?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const totalNumberOfProducts = sale.saleItens?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const totalDiscounts = sale.discounts?.reduce((acc, discount) => acc + discount.value, 0) || 0;

  const totalCreditsUsed = sale.usedCredits?.reduce((acc, credit) => acc + credit.value, 0) || 0;

  const totalCreditsGenerated =
    sale.generatedCredits?.reduce((acc, credit) => acc + credit.value, 0) || 0;

  /**
   * total = produtos + frete - descontos - creditos usados + creditos gerados
   */

  const total =
    totalProducts +
    (sale.shipping || 0) -
    totalDiscounts -
    totalCreditsUsed +
    totalCreditsGenerated;

  const { response } = searchParams;

  return (
    <>
      {response && (
        <PaymentMessage
          responseData={searchParams}
          shortId={shortId}
          pendingPaymentLink={
            data.saleByShortId.payments.find(payment => payment.status === 'PENDING')?.link || ''
          }
        />
      )}
      <div className="h-full w-full overflow-y-auto bg-white p-4 text-black md:p-12 print:p-0">
        <ButtonPrint />
        <h2>{message}</h2>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
          <ul>
            <li>
              <strong>Número da venda: </strong>
              {sale.code}
            </li>
            <li>
              <strong> Cliente: </strong>
              {sale.client.name}
            </li>
            <li>
              <strong> Data: </strong>
              {fDate(sale.startedAt)}
            </li>
          </ul>

          <div className="flex justify-center sm:block">
            <Image className="logo" src={LogoMarconImg} alt="Logo Marcon numismatica" />
          </div>
        </div>

        <div className="xs:block hidden overflow-x-auto print:overflow-x-hidden">
          <table className="min-w-[700px]">
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th className="table-cell sm:hidden">Qtd</th>
                <th className="table-cell sm:hidden">Valor</th>
                <th>Código</th>
                <th>Ano</th>
                <th>Origem</th>
                <th className="hidden sm:table-cell">Qtd</th>
                <th className="hidden sm:table-cell">Valor</th>
              </tr>
            </thead>
            {sale.saleItens?.map(sp => (
              <tr key={sp.id}>
                <td>{fDate(sp.addedAt)}</td>
                <td>{sp.product.name}</td>
                <td className="table-cell sm:hidden">{sp.quantity}</td>
                <td className="table-cell sm:hidden">{formatToBRL(sp.price)}</td>
                <td>{sp.product.code}</td>
                <td>
                  {sp.product.variations?.find(v => v.variationType.name === 'year')?.value &&
                  sp.product.variations?.find(v => v.variationType.name === 'year')?.value !==
                    null &&
                  sp.product.variations?.find(v => v.variationType.name === 'year')?.value !==
                    undefined
                    ? Number(
                        sp.product.variations?.find(v => v.variationType.name === 'year')?.value ||
                          0,
                      ) === 0
                      ? ''
                      : sp.product.variations?.find(v => v.variationType.name === 'year')?.value
                    : ''}
                </td>
                <td>
                  {
                    sp.product.variations?.find(v => v.variationType.name === 'country')
                      ?.variationValue?.name
                  }
                </td>
                <td className="hidden sm:table-cell">{sp.quantity}</td>
                <td className="hidden sm:table-cell">{formatToBRL(sp.price)}</td>
              </tr>
            ))}

            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td className="table-cell sm:hidden">Frete=</td>
              <td className="table-cell sm:hidden" />
              <td className="table-cell sm:hidden">{formatToBRL(sale.shipping || 0)}</td>
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Frete=</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell">{formatToBRL(sale.shipping || 0)}</td>
            </tr>
            <tr>
              <td />
              <td className="table-cell sm:hidden">Desconto=</td>
              <td className="table-cell sm:hidden" />
              <td className="table-cell sm:hidden">{formatToBRL(totalDiscounts)}</td>
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Desconto=</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell">{formatToBRL(totalDiscounts)}</td>
            </tr>
            <tr>
              <td />
              <td className="table-cell sm:hidden">Créditos usados=</td>
              <td className="table-cell sm:hidden" />
              <td className="table-cell sm:hidden">{formatToBRL(totalCreditsUsed)}</td>
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Créditos usados=</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell">{formatToBRL(totalCreditsUsed)}</td>
            </tr>
            <tr>
              <td />
              <td className="table-cell sm:hidden">Créditos gerados=</td>
              <td className="table-cell sm:hidden" />
              <td className="table-cell sm:hidden">{formatToBRL(totalCreditsGenerated)}</td>
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Créditos gerados=</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell">{formatToBRL(totalCreditsGenerated)}</td>
            </tr>
            <tr>
              <td />
              <td className="table-cell sm:hidden">Total</td>
              <td className="table-cell sm:hidden">{totalNumberOfProducts}</td>
              <td className="table-cell sm:hidden">{formatToBRL(total)}</td>
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Total</td>
              <td className="hidden sm:table-cell">{totalNumberOfProducts}</td>
              <td className="hidden sm:table-cell">{formatToBRL(total)}</td>
            </tr>
          </table>
        </div>

        <div className="xs:hidden p-4">
          {sale.saleItens?.map(sp => (
            <div className="mb-4 rounded border border-gray-100 px-2 py-4 shadow" key={sp.id}>
              <div className="flex justify-between py-0.5">
                Data: <span>{fDate(sp.addedAt)}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Produto: <span>{sp.product.name}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Código: <span>{sp.product.code}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Ano:{' '}
                <span>
                  {sp.product.variations?.find(v => v.variationType.name === 'year')?.value &&
                  sp.product.variations?.find(v => v.variationType.name === 'year')?.value !==
                    null &&
                  sp.product.variations?.find(v => v.variationType.name === 'year')?.value !==
                    undefined
                    ? Number(
                        sp.product.variations?.find(v => v.variationType.name === 'year')?.value ||
                          0,
                      ) === 0
                      ? ''
                      : sp.product.variations?.find(v => v.variationType.name === 'year')?.value
                    : ''}
                </span>
              </div>
              <div className="flex justify-between  py-0.5">
                Origem:{' '}
                <span>
                  {
                    sp.product.variations?.find(v => v.variationType.name === 'country')
                      ?.variationValue?.name
                  }
                </span>
              </div>
              <div className="flex justify-between  py-0.5">
                Qtd: <span>{sp.quantity}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Valor: <span>{formatToBRL(sp.price)}</span>
              </div>
            </div>
          ))}

          <div className="mb-4 rounded border border-gray-100 px-2 py-4 shadow">
            <div className="flex justify-between py-0.5">
              Frete: <span>{formatToBRL(sale.shipping || 0)}</span>
            </div>
            <div className="flex justify-between  py-0.5">
              Desconto: <span>{formatToBRL(totalDiscounts)}</span>
            </div>
            <div className="flex justify-between  py-0.5">
              Créditos usados: <span>{formatToBRL(totalCreditsUsed)}</span>
            </div>
            <div className="flex justify-between  py-0.5">
              Créditos gerados: <span>{formatToBRL(totalCreditsGenerated)}</span>
            </div>
            <div className="flex justify-between  py-0.5">
              Total de produtos: <span>{totalNumberOfProducts}</span>
            </div>
            <div className="flex justify-between  py-0.5">
              Valor Total: <span>{formatToBRL(total)}</span>
            </div>
          </div>
        </div>

        <h3>Pagamentos</h3>

        <table>
          <thead>
            <tr>
              <th>Data do Pagamento</th>
              <th>Tipo de Pagamento</th>
              <th>Valor Pago</th>
            </tr>
          </thead>
          {sale.salePayments?.map(r => (
            <tr key={r.id}>
              <td>{fDate(r.payedAt)}</td>
              <td>{r.paymentMethod.name}</td>
              <td>{formatToBRL(r.value)}</td>
            </tr>
          ))}
          {data.saleByShortId.payments.map(r => (
            <tr key={r.id}>
              <td>{fDate(r.createdAt)}</td>
              <td>{r.method || r.status}</td>
              <td>{formatToBRL(r.value)}</td>
            </tr>
          ))}
          <tr>
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td />
            <td>Saldo=</td>
            <td>{formatToBRL(totalReceived - total)}</td>
          </tr>
        </table>

        {totalReceivedWithOutPending - total < 0 && (
          <PaymentInfo
            saleId={data.saleByShortId.id}
            diference={totalReceivedWithOutPending - total}
            payments={data.saleByShortId.payments}
          />
        )}

        {/* <div className="flex w-full justify-center">
          <Image src={PixImg} alt="Formas de pagamento" />
        </div> */}
      </div>
    </>
  );
}
