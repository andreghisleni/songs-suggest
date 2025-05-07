'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  GetWhatsappDebtorMessageDocument,
  GetWhatsappDebtorMessageQuery,
  UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0,
  UpdateWhatsappDebtorMessageInput_TypeEnum_0,
  useCreateWhatsappDebtorMessageMutation,
  useUpdateWhatsappDebtorMessageMutation,
} from '@/generated/graphql';

const formSchema = z.object({
  message: z.string(),
});

type Props = {
  type: 'FOLLOW_UP_1' | 'FOLLOW_UP_2' | 'FOLLOW_UP_3';
  message?: GetWhatsappDebtorMessageQuery['whatsappDebtorMessages'][0];
};

enum WhatsappDebtorMessageTypeShow {
  FOLLOW_UP_1 = 'Follow up 1',
  FOLLOW_UP_2 = 'Follow up 2',
  FOLLOW_UP_3 = 'Follow up 3',
}

export function WhatsappDebtorMessageForm({ type, message }: Props) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: message?.message || '',
    },

    values: {
      message: message?.message || '',
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    if (message?.id) {
      await updateWhatsappDebtorMessage({
        variables: {
          input: {
            id: message.id,
            message: values.message,
            messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0.Text,
            type: type as UpdateWhatsappDebtorMessageInput_TypeEnum_0,
          },
        },
      });
    } else {
      await createWhatsappDebtorMessage({
        variables: {
          input: {
            message: values.message,
            messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0.Text,
            type: type as UpdateWhatsappDebtorMessageInput_TypeEnum_0,
          },
        },
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Mensagem de cobrança {WhatsappDebtorMessageTypeShow[type]}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mensagem" {...field} rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Salvar'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
