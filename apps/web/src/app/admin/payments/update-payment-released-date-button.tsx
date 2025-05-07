'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUpdatePaymentReleasedDateMutation } from '@/generated/graphql';

type IProps = {
  id: string;
  refetch: () => void;
};

export function UpdatePaymentReleasedDateButton({ id, refetch }: IProps) {
  const { toast } = useToast();
  const [activateUserMutation, { loading }] = useUpdatePaymentReleasedDateMutation({
    variables: {
      id,
    },
    onCompleted: () => {
      toast({
        title: 'Sucesso',
        description: 'Pagamento atualizado com sucesso',
      });
      refetch();
    },
    onError: error => {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleUpdateUserPaymentReleasedDate = () => {
    activateUserMutation();
  };

  return (
    <Button disabled={loading} onClick={handleUpdateUserPaymentReleasedDate}>
      Confirmar pagamento
    </Button>
  );
}
