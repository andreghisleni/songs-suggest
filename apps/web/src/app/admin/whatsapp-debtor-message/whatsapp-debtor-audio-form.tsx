'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useToast } from '@/components/ui/use-toast';

import {
  GetWhatsappDebtorMessageDocument,
  GetWhatsappDebtorMessageQuery,
  UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0,
  UpdateWhatsappDebtorMessageInput_TypeEnum_0,
  useCreateWhatsappDebtorMessageMutation,
  useUpdateWhatsappDebtorMessageMutation,
} from '@/generated/graphql';
import { FileUpload } from '@/components/file-upload';
import { useUploadFile } from '@/hooks/useUploadFile';
import axios from 'axios';
import { env } from '@/env';

type Props = {
  message?: GetWhatsappDebtorMessageQuery['whatsappDebtorMessages'][0];
};

export function WhatsappDebtorAudioForm({ message }: Props) {
  const { toast } = useToast();

  const [createWhatsappDebtorMessage] = useCreateWhatsappDebtorMessageMutation({
    onCompleted() {
      toast({
        title: 'Mensagem de cobrança salva com sucesso',
      });
    },
    onError() {
      toast({
        title: 'Erro ao salvar mensagem de cobrança',
        variant: 'destructive',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetWhatsappDebtorMessageDocument],
  });

  const [updateWhatsappDebtorMessage] = useUpdateWhatsappDebtorMessageMutation({
    onCompleted() {
      toast({
        title: 'Mensagem de cobrança atualizada com sucesso',
      });
    },
    onError() {
      toast({
        title: 'Erro ao atualizar mensagem de cobrança',
        variant: 'destructive',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetWhatsappDebtorMessageDocument],
  });

  const f = useUploadFile({
    serverFileUrl: message?.message
      ? `${env.NEXT_PUBLIC_API_URL}/files?file=${message.message}`
      : undefined,
    handleUploadFunction: async (file: File) => {
      const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/files?file=${file.name}`);

      const uploadURL = response.data.url;

      await axios.put(uploadURL, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (message?.id) {
        await updateWhatsappDebtorMessage({
          variables: {
            input: {
              id: message.id,
              message: file.name,
              messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0.Audio,
              type: UpdateWhatsappDebtorMessageInput_TypeEnum_0.Message,
            },
          },
        });
      } else {
        await createWhatsappDebtorMessage({
          variables: {
            input: {
              message: file.name,
              messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0.Audio,
              type: UpdateWhatsappDebtorMessageInput_TypeEnum_0.Message,
            },
          },
        });
      }

      return {
        file_name: '',
        reset: true,
      };
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Mensagem de cobrança</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <audio src={`${env.NEXT_PUBLIC_API_URL}/files?file=messages/${message?.message}`} controls>
          <track kind="captions" />
        </audio>
        <FileUpload
          file={f}
          buttonTexts={({ isFileUploading, fileUploadedName }) =>
            isFileUploading
              ? 'Enviando...'
              : fileUploadedName
                ? 'Audio cadastrado com sucesso'
                : 'Cadastrar audio'
          }
          uploadType="audio"
          hight="sm"
        />
      </CardContent>
    </Card>
  );
}
