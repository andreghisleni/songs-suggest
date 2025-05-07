import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GetAllSalesFromClosingDocument, useReprocessSaleMutation } from '@/generated/graphql';
import { useRouter } from 'next/navigation';

export function ReprocessButton({ saleId }: { saleId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const [reprocessSale] = useReprocessSaleMutation({
    onCompleted: () => {
      toast({
        title: 'Fechamento reprocessado com sucesso',
      });
    },
    onError: () => {
      toast({
        title: 'Erro ao reprocessar fechamento',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetAllSalesFromClosingDocument],
  });

  return (
    <Button
      variant="secondary"
      onClick={() => {
        reprocessSale({
          variables: {
            saleId,
          },
        });
      }}
    >
      Reprocessar
    </Button>
  );
}
