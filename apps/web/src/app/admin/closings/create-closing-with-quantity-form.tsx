'use organization';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
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
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { GetAllClosingsDocument, useCreateClosingMutation } from '@/generated/graphql';
import { useRouter } from 'next/navigation';
import { inputPhoneMask } from '@/utils/inputMasks';

const formSchema = z.object({
  phone: z.string(),
  quantity: z.coerce.number(),
});

export function CreateClosingWithQuantityFormDialog() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      quantity: 0,
    },
  });

  const [createInvite] = useCreateClosingMutation({
    onCompleted: ({ createClosing }) => {
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Fechamento criado com sucesso',
      });
      router.push(`/admin/closings/${createClosing.id}/sales`);
    },
    onError: error => {
      toast({
        title: 'Erro ao criar fechamento',
        description: error.message,
        variant: 'destructive',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetAllClosingsDocument],
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      await createInvite({
        variables: {
          phone: values.phone,
          quantity: values.quantity,
        },
      });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Fechamento</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefone" {...field} value={inputPhoneMask(field.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
