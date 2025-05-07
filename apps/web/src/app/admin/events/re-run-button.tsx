import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  GetAllEventsDocument,
  useToggleEventIsOpenedToReceiveSuggestionsMutation,
} from "@/generated/graphql";
import { useRouter } from "next/navigation";

export function ToggleEventButton({ eventId }: { eventId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const [toggleEventEvent] = useToggleEventIsOpenedToReceiveSuggestionsMutation(
    {
      onCompleted: ({
        toggleEventIsOpenedToReceiveSuggestions: {
          isOpenedToReceiveSuggestions,
        },
      }) => {
        toast({
          title: isOpenedToReceiveSuggestions
            ? "Evento aberto a sugestões"
            : "Evento fechado a sugestões",
        });
      },
      onError: () => {
        toast({
          title: "Erro ao atualizar evento",
        });
      },
      awaitRefetchQueries: true,
      refetchQueries: [GetAllEventsDocument],
    },
  );

  return (
    <Button
      variant="secondary"
      onClick={() => {
        toggleEventEvent({
          variables: {
            id: eventId,
          },
        });
      }}
    >
      Abrir/Fechar
    </Button>
  );
}
