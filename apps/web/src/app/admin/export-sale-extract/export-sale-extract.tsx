'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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
import { Input } from '@/components/ui/input';
import { env } from '@/env';

const formSchema = z.object({
  externalId: z.string(),
});

export function ExportSaleExtract() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      externalId: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      const response = await axios.post(
        'https://export-html.coolify.institutoestater.com.br/1/pdf',
        {
          url: `${env.NEXT_PUBLIC_VERCEL_URL.startsWith('http://') ? 'https://financeiro.marconnumis.com.br' : env.NEXT_PUBLIC_VERCEL_URL}/sale/${values.externalId}`,
          export: {
            format: 'A4',
            printBackground: true,
            margin: {
              top: '1cm',
              right: '0.5cm',
              bottom: '2.5cm',
              left: '0.5cm',
            },
            headerTemplate: '<div />',
            footerTemplate:
              "<div style='font-size: 11px !important; overflow: auto; margin-left: 1.5cm; margin-right: 1.5cm; color: ghostwhite;'>Página <span class='pageNumber'></span> de <span class='totalPages'></span></div>",
          },
        },
        {
          responseType: 'blob',
        },
      );

      if (response.data.error) {
        toast({
          title: 'Erro ao exportar fechamentos',
          description: response.data.error,
        });
        return;
      }

      // application/octet-stream to blob and download

      const url = window.URL.createObjectURL(response.data);

      console.log(url);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'fechamentos.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: 'Erro ao exportar fechamentos',
        description: error.message,
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fechamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="externalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Id externo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Gerar PDF'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
