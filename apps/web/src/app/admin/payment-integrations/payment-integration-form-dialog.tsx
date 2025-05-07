'use paymentIntegration';

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
import {
  GetAllPaymentIntegrationsDocument,
  UpdatePaymentIntegrationInput_TypeEnum_0,
  useCreatePaymentIntegrationMutation,
  useUpdatePaymentIntegrationMutation,
} from '@/generated/graphql';
import { MySelect } from '@/components/my-select';
import { PaymentIntegration } from './columns';

interface PaymentIntegrationFormDialogProps {
  refetch: () => void;
  paymentIntegration?: PaymentIntegration;
}

const formSchema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(UpdatePaymentIntegrationInput_TypeEnum_0),
  token: z.string().min(3),
  paymentMethods: z.array(z.string()),
});

export function PaymentIntegrationFormDialog({
  refetch,
  paymentIntegration,
}: PaymentIntegrationFormDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: undefined,
      token: '',
      paymentMethods: [],
    },
    values: {
      name: paymentIntegration?.name ?? '',
      type: (paymentIntegration?.type as UpdatePaymentIntegrationInput_TypeEnum_0) ?? '',
      token: paymentIntegration?.token ?? '',
      paymentMethods: paymentIntegration?.paymentMethods ?? [],
    },
  });

  const [createPaymentIntegration] = useCreatePaymentIntegrationMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Sessão cadastrado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao cadastrar Sessão',
        description: error.message,
        variant: 'destructive',
      });
    },
    refetchQueries: [GetAllPaymentIntegrationsDocument],
    awaitRefetchQueries: true,
  });

  const [updatePaymentIntegration] = useUpdatePaymentIntegrationMutation({
    onCompleted: () => {
      refetch();
      form.reset();
      setIsOpen(false);
      toast({
        title: 'Sessão atualizado com sucesso',
      });
    },
    onError: error => {
      toast({
        title: 'Erro ao atualizar Sessão',
        description: error.message,
        variant: 'destructive',
      });
    },
    refetchQueries: [GetAllPaymentIntegrationsDocument],
    awaitRefetchQueries: true,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console

    try {
      if (paymentIntegration) {
        await updatePaymentIntegration({
          variables: {
            input: {
              id: paymentIntegration.id,
              ...values,
            },
          },
        });
      } else {
        await createPaymentIntegration({
          variables: {
            input: {
              ...values,
            },
          },
        });
      }
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{paymentIntegration ? 'Editar' : 'Adicionar'}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{paymentIntegration ? 'Editar Sessão' : 'Cadastrar Sessão'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <MySelect
                      {...field}
                      options={[
                        {
                          label: 'Mercado Pago',
                          value: 'MERCADO_PAGO',
                        },
                        {
                          label: 'Sicredi',
                          value: 'SICREDI',
                        },
                      ]}
                      menuPosition="absolute"
                      value={field.value}
                      disabled={!!paymentIntegration?.type}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input placeholder="Token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Métodos de Pagamento</FormLabel>
                  <FormControl>
                    <MySelect
                      {...field}
                      options={[
                        {
                          label: 'Cartão de Crédito',
                          value: 'CREDIT_CARD',
                        },
                        {
                          label: 'Cartão de Débito',
                          value: 'DEBIT_CARD',
                        },
                        {
                          label: 'Boleto',
                          value: 'BANK_BILLET',
                        },
                        {
                          label: 'Pix',
                          value: 'PIX',
                        },
                      ]}
                      menuPosition="absolute"
                      value={field.value?.filter(v => v !== undefined)}
                      isMulti
                      closeMenuOnSelect={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : paymentIntegration ? (
                'Salvar'
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
