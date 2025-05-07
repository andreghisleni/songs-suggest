import { GetSaleWithExternalIdDocument, GetSaleWithExternalIdQuery } from '@/generated/graphql';
import { client } from '@/services/apollo';
import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';

import { z } from 'zod';

import PixImg from '@/assets/pix.png';

import './styles.css';
import { format } from 'date-fns';
import Image from 'next/image';
import { formatToBRL } from '@/utils/formatToBRL';
import LogoMarconImg from '@/assets/logo-marcon.png';
import { cn } from '@/lib/utils';
import { ShowJson } from '@/components/show-json';
import { ButtonPrint } from './button-print';

export const metadata: Metadata = {
  title: 'Fechamento',
};

const pageParams = z.object({
  params: z.object({
    externalId: z.string(),
  }),
  searchParams: z.object({
    pdf: z.coerce.boolean().optional(),
  }),
});

const fDate = (da: string | null) => {
  if (!da) return '';

  if (da === 'null') return '';

  const d = new Date(da);
  // d?.setDate(d.getDate() + 1);

  return d ? format(d, 'dd/MM/yyyy') : '';
};

export default async function UserPage(props: z.infer<typeof pageParams>) {
  unstable_noStore();

  const p = pageParams.safeParse(props);

  if (!p.success) {
    return <div>Invalid parameters</div>;
  }

  const {
    params: { externalId },
    searchParams: { pdf },
  } = p.data;

  try {
    const {
      data: dataExternal,
      errors,
      error,
    } = await client.query<GetSaleWithExternalIdQuery>({
      query: GetSaleWithExternalIdDocument,
      variables: { externalId },
    });

    const sale = dataExternal.saleByExternalId;

    if (error || errors) {
      return <ShowJson data={{ error, errors }} />;
    }

    return (
      <div
        className={cn(
          'h-full w-full overflow-y-auto bg-white p-4 text-black md:p-12 print:p-0',
          pdf && 'p-0 md:p-0',
        )}
      >
        {!pdf && <ButtonPrint />}
        {!pdf ? (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
            <ul>
              <li>
                <strong>Número da venda: </strong>
                {sale.saleId}
              </li>
              <li>
                <strong> Cliente: </strong>
                {sale.customer.name}
              </li>
              <li>
                <strong> Data: </strong>
                {fDate(sale.date)}
              </li>
            </ul>

            <div className="flex justify-center sm:block">
              <Image className="logo" src={LogoMarconImg} alt="Logo Marcon numismatica" />
            </div>
          </div>
        ) : (
          <div className="header">
            <table className="no-border">
              <tr>
                <td>
                  <ul>
                    <li>
                      <strong>Número da venda: </strong>
                      {sale.saleId}
                    </li>
                    <li>
                      <strong> Cliente: </strong>
                      {sale.customer.name}
                    </li>
                    <li>
                      <strong> Data: </strong>
                      {fDate(sale.date)}
                    </li>
                  </ul>
                </td>
                <td className="right">
                  <Image className="logo" src={LogoMarconImg} alt="Logo Marcon numismatica" />
                </td>
              </tr>
            </table>
          </div>
        )}

        <div className="xs:block hidden overflow-x-auto print:overflow-x-hidden">
          <table className="min-w-[700px]">
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                {!pdf && (
                  <>
                    <th className="table-cell sm:hidden">Qtd</th>
                    <th className="table-cell sm:hidden">Valor</th>
                  </>
                )}
                <th>Código</th>
                <th>Ano</th>
                <th>Origem</th>
                <th className="hidden sm:table-cell">Qtd</th>
                <th className="hidden sm:table-cell">Valor</th>
              </tr>
            </thead>
            {sale.products.map(sp => (
              <tr key={sp.cartId}>
                <td>{fDate(sp.saleDate)}</td>
                <td>{sp.product?.name}</td>
                {!pdf && (
                  <>
                    <td className="table-cell sm:hidden">{sp.quantity}</td>
                    <td className="table-cell sm:hidden">{formatToBRL(sp.price)}</td>
                  </>
                )}
                <td>{sp.product?.code}</td>
                <td>{sp.product?.year === 0 ? '' : sp.product?.year}</td>
                <td>{sp.product?.country?.name}</td>
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
              {!pdf && (
                <>
                  <td className="table-cell sm:hidden">Frete=</td>
                  <td className="table-cell sm:hidden" />
                  <td className="table-cell sm:hidden">{formatToBRL(sale.shipping)}</td>
                </>
              )}
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Frete=</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell">{formatToBRL(sale.shipping)}</td>
            </tr>
            <tr>
              <td />
              {!pdf && (
                <>
                  <td className="table-cell sm:hidden">Desconto=</td>
                  <td className="table-cell sm:hidden" />
                  <td className="table-cell sm:hidden">{formatToBRL(sale.totalDiscounts)}</td>
                </>
              )}
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Desconto=</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell">{formatToBRL(sale.totalDiscounts)}</td>
            </tr>
            <tr>
              <td />
              {!pdf && (
                <>
                  <td className="table-cell sm:hidden">Crédito=</td>
                  <td className="table-cell sm:hidden" />
                  <td className="table-cell sm:hidden">{formatToBRL(sale.totalCredits)}</td>
                </>
              )}
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Crédito=</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell">{formatToBRL(sale.totalCredits)}</td>
            </tr>
            <tr>
              <td />
              {!pdf && (
                <>
                  <td className="table-cell sm:hidden">Total</td>
                  <td className="table-cell sm:hidden">{sale.totalProducts}</td>
                  <td className="table-cell sm:hidden">{formatToBRL(sale.total)}</td>
                </>
              )}
              <td />
              <td />
              <td />
              <td className="hidden sm:table-cell">Total</td>
              <td className="hidden sm:table-cell">{sale.totalProducts}</td>
              <td className="hidden sm:table-cell">{formatToBRL(sale.total)}</td>
            </tr>
          </table>
        </div>

        <div className="xs:hidden p-4">
          {!pdf &&
            sale.products.map(sp => (
              <div className="mb-4 rounded border border-gray-100 px-2 py-4 shadow" key={sp.cartId}>
                <div className="flex justify-between py-0.5">
                  Data: <span>{fDate(sp.saleDate)}</span>
                </div>
                <div className="flex justify-between  py-0.5">
                  Produto: <span>{sp.product?.name}</span>
                </div>
                <div className="flex justify-between  py-0.5">
                  Código: <span>{sp.product?.code}</span>
                </div>
                <div className="flex justify-between  py-0.5">
                  Ano: <span>{sp.product?.year === 0 ? '' : sp.product?.year}</span>
                </div>
                <div className="flex justify-between  py-0.5">
                  Qtd: <span>{sp.quantity}</span>
                </div>
                <div className="flex justify-between  py-0.5">
                  Valor: <span>{formatToBRL(sp.price)}</span>
                </div>
              </div>
            ))}

          {!pdf && (
            <div className="mb-4 rounded border border-gray-100 px-2 py-4 shadow">
              <div className="flex justify-between py-0.5">
                Frete: <span>{formatToBRL(sale.shipping)}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Desconto: <span>{formatToBRL(sale.totalDiscounts)}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Crédito: <span>{formatToBRL(sale.totalCredits)}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Total de produtos: <span>{sale.totalProducts}</span>
              </div>
              <div className="flex justify-between  py-0.5">
                Valor Total: <span>{formatToBRL(sale.total)}</span>
              </div>
            </div>
          )}
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
          {sale.receipts.map(r => (
            <tr key={r.receiptId}>
              <td>{fDate(r.date)}</td>
              <td>{r.paymentMethod.name}</td>
              <td>{formatToBRL(r.amount)}</td>
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
            <td>{formatToBRL(sale.totalReceived - sale.total)}</td>
          </tr>
        </table>

        {!pdf && (
          <div className="flex w-full justify-center">
            <Image src={PixImg} alt="Formas de pagamento" />
          </div>
        )}
      </div>
    );
  } catch (error) {
    return JSON.stringify(error, null, 2);
  }
}
