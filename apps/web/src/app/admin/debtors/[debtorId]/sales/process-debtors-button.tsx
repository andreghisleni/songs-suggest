'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GetAllSalesFromDebtorDocument, useProcessDebtorMutation } from '@/generated/graphql';

export function ProcessDebtorsButton({ id }: { id: string }) {
  const { toast } = useToast();

  const [processDebtor, { loading }] = useProcessDebtorMutation({
    variables: {
      id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetAllSalesFromDebtorDocument],
    onError: error => {
      toast({
        title: 'Erro ao processar cobrança',
        description: error.message,
        variant: 'destructive',
      });
    },
    onCompleted: () => {
      toast({
        title: 'Cobrança processada com sucesso',
      });
    },
  });

  return (
    <Button
      variant="outline"
      onClick={() => {
        processDebtor();
      }}
      disabled={loading}
    >
      {loading ? <Loader2 size={16} /> : 'Processar'}
    </Button>
  );
}
