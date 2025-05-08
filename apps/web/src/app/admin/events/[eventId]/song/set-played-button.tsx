import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  GetEventByIdWithSongsDocument,
  useSetPlayedSongMutation,
} from "@/generated/graphql";

export function SetPlayedButton({ id }: { id: string }) {
  const { toast } = useToast();

  const [reprocessSale] = useSetPlayedSongMutation({
    onCompleted: () => {
      toast({
        title: "Música marcada como tocada com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao marcar música como tocada",
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
      Tocada
    </Button>
  );
}
