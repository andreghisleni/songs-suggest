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
  GetWhatsappEndMessageDocument,
  useCreateWhatsappEndMessageMutation,
  useGetWhatsappEndMessageQuery,
  useUpdateWhatsappEndMessageMutation,
} from '@/generated/graphql';

const formSchema = z.object({
  message: z.string(),
});

export function WhatsappEndMessageForm() {
  const { toast } = useToast();

  const message = useGetWhatsappEndMessageQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },

    values: {
      message: message.data?.whatsappEndMessages[0]?.message || '',
    },
  });

  const [createWhatsappEndMessage] = useCreateWhatsappEndMessageMutation({
    onCompleted() {
      toast({
        title: 'Mensagem final salva com sucesso',
      });
    },
    onError() {
      toast({
        title: 'Erro ao salvar mensagem final',
        variant: 'destructive',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetWhatsappEndMessageDocument],
  });

  const [updateWhatsappEndMessage] = useUpdateWhatsappEndMessageMutation({
    onCompleted() {
      toast({
        title: 'Mensagem final atualizada com sucesso',
      });
    },
    onError() {
      toast({
        title: 'Erro ao atualizar mensagem final',
        variant: 'destructive',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetWhatsappEndMessageDocument],
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    if (message.data?.whatsappEndMessages.length) {
      await updateWhatsappEndMessage({
        variables: {
          input: {
            id: message.data.whatsappEndMessages[0].id,
            message: values.message,
          },
        },
      });
    } else {
      await createWhatsappEndMessage({
        variables: {
          input: {
            message: values.message,
          },
        },
      });
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Final da mensagem</CardTitle>
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

              <Button type="submit" className="w-full">
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
    </div>
  );
}
