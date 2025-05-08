import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  GetEventByIdWithSongsDocument,
  useSetRejectedSongMutation,
} from "@/generated/graphql";

export function SetRejectedButton({ id }: { id: string }) {
  const { toast } = useToast();

  const [reprocessSale] = useSetRejectedSongMutation({
    onCompleted: () => {
      toast({
        title: "Música marcada como rejeitada com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao marcar música como rejeitada",
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetEventByIdWithSongsDocument],
  });

  return (
    <Button
      variant="secondary"
      onClick={() => {
        reprocessSale({
          variables: {
            id,
          },
        });
      }}
    >
      Rejeitada
    </Button>
  );
}
