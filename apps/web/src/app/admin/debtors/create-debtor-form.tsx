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

import { GetAllDebtorsDocument, useCreateDebtorMutation } from '@/generated/graphql';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  daysToCheck: z.coerce.number(),
});

export function CreateDebtorFormDialog() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      daysToCheck: 0,
    },
  });

  const [createInvite] = useCreateDebtorMutation({
    onCompleted: ({ createDebtor }) => {
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Devedores criado com sucesso',
      });
      // router.push(`/admin/debtors/${createDebtor.id}/sales`);
    },
    onError: error => {
      toast({
        title: 'Erro ao criar devedores',
        description: error.message,
        variant: 'destructive',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetAllDebtorsDocument],
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      await createInvite({
        variables: {
          daysToCheck: values.daysToCheck,
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
          <DialogTitle>Cadastrar Devedores</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="daysToCheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dias para em aberto</FormLabel>
                  <FormControl>
                    <Input placeholder="Dias para em aberto" {...field} />
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
