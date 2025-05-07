import { Metadata } from 'next';

import { BasePageWithoutFilter } from '@/components/base-page';
import { WhatsappEndMessageForm } from './whatsapp-end-message-form';

export const metadata: Metadata = {
  title: 'Mensagem final do WhatsApp',
  description: 'Configure a mensagem final do WhatsApp',
};

export default BasePageWithoutFilter(
  a => a.can('get', 'WhatsappEndMessage'),
  () => {
    return <WhatsappEndMessageForm />;
  },
);
