import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GetAllClosingsDocument, useReRunClosingWithErrorMutation } from '@/generated/graphql';
import { useRouter } from 'next/navigation';

export function ReRunWithErrorButton({ closingId }: { closingId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const [reRunClosing] = useReRunClosingWithErrorMutation({
    onCompleted: ({ reRunClosingWithError: { id } }) => {
      toast({
        title: 'Fechamento reprocessado com sucesso',
      });
      router.push(`/admin/closings/${id}/sales`);
    },
    onError: () => {
      toast({
        title: 'Erro ao reprocessar fechamento',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetAllClosingsDocument],
  });

  return (
    <Button
      variant="secondary"
      onClick={() => {
        reRunClosing({
          variables: {
            closingId,
          },
        });
      }}
    >
      Re-processar
    </Button>
  );
}
