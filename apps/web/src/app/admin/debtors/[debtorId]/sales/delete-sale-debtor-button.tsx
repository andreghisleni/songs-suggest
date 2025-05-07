'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import {
  GetAllSalesFromDebtorDocument,
  useDeleteSaleFromDebtorMutation,
} from '@/generated/graphql';
import { Sale } from './columns';

export function DeleteSaleDebtorButton({ sale }: { sale: Sale }) {
  const { toast } = useToast();

  const [deleteSaleFromDebtor, { loading }] = useDeleteSaleFromDebtorMutation({
    variables: {
      id: sale.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetAllSalesFromDebtorDocument],
    onError: error => {
      toast({
        title: 'Erro ao deletar cobrança',
        description: error.message,
        variant: 'destructive',
      });
    },
    onCompleted: () => {
      toast({
        title: 'Cobrança deletada com sucesso',
      });
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="destructive" size="sm">
          {loading ? <Loader2 size={16} /> : 'Deletar'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        Tem certeza que deseja deletar a cobrança?
        <div className="flex">
          <Button
            variant="destructive"
            onClick={() => {
              deleteSaleFromDebtor();
            }}
            size="sm"
            className="mt-4"
          >
            Deletar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
