'use client';

import React from 'react';

import { useToast } from '@/components/ui/use-toast';

import {
  UpdateWhatsappDebtorMessageInput_TypeEnum_0,
  useGetWhatsappDebtorMessageQuery,
} from '@/generated/graphql';
import { WhatsappDebtorMessageForm } from './whatsapp-debtor-message-form';
import { WhatsappDebtorAudioForm } from './whatsapp-debtor-audio-form';

export function WhatsappDebtorMessages() {
  const { toast } = useToast();

  const { data } = useGetWhatsappDebtorMessageQuery();

  const whatsappDebtorMessages = data?.whatsappDebtorMessages;

  const message = whatsappDebtorMessages?.find(
    m => m.type === UpdateWhatsappDebtorMessageInput_TypeEnum_0.Message,
  );
  const followUp1 = whatsappDebtorMessages?.find(
    m => m.type === UpdateWhatsappDebtorMessageInput_TypeEnum_0.FollowUp_1,
  );
  const followUp2 = whatsappDebtorMessages?.find(
    m => m.type === UpdateWhatsappDebtorMessageInput_TypeEnum_0.FollowUp_2,
  );
  const followUp3 = whatsappDebtorMessages?.find(
    m => m.type === UpdateWhatsappDebtorMessageInput_TypeEnum_0.FollowUp_3,
  );

  return (
    <div className="flex flex-wrap justify-center gap-8">
      <WhatsappDebtorAudioForm message={message} />
      <WhatsappDebtorMessageForm type="FOLLOW_UP_1" message={followUp1} />
      <WhatsappDebtorMessageForm type="FOLLOW_UP_2" message={followUp2} />
      <WhatsappDebtorMessageForm type="FOLLOW_UP_3" message={followUp3} />
    </div>
  );
}
