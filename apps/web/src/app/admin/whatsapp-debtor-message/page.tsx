import { Metadata } from 'next';

import { BasePageWithoutFilter } from '@/components/base-page';
import { WhatsappDebtorMessages } from './whatsapp-debtor-messages';

export const metadata: Metadata = {
  title: 'Mensagens de cobrança do WhatsApp',
  description: 'Configure as mensagens de cobrança do WhatsApp',
};

export default BasePageWithoutFilter(
  a => a.can('get-all', 'WhatsappDebtorMessage'),
  () => {
    return <WhatsappDebtorMessages />;
  },
);
