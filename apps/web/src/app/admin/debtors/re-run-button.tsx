import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GetAllClosingsDocument, useReRunClosingMutation } from '@/generated/graphql';
import { useRouter } from 'next/navigation';

export function ReRunButton({ closingId }: { closingId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const [reRunClosing] = useReRunClosingMutation({
    onCompleted: ({ reRunClosing: { id } }) => {
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
