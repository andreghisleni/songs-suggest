"use seller";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { z } from "@/utils/pt-zod";

import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  GetAllEventsDocument,
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/generated/graphql";
import { Input } from "@/components/ui/input";
import { removeCharacters } from "@/utils/remove-characters";
import { Event } from "./columns";

export const formSchema = z.object({
  name: z.string().describe("The name of the event."),
  slug: z.string().describe("The slug of the event."),
  logo: z.string().optional().describe("The logo of the event."),
  banner: z.string().optional().describe("The banner of the event."),
  description: z.string().optional().describe("The description of the event."),
  isPeopleSequenceSuggestLimitable: z.coerce
    .boolean()
    .optional()
    .default(false)
    .describe("Whether the event is people sequence suggest limitable."),
  numberOfPeopleSequenceSuggestLimit: z.coerce
    .number()
    .optional()
    .default(0)
    .describe("The number of people sequence suggest limit."),
});

export function EventForm({ event }: { event?: Event }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
      banner: "",
      description: "",
      isPeopleSequenceSuggestLimitable: false,
      numberOfPeopleSequenceSuggestLimit: 0,
    },
    ...(event && {
      values: {
        name: event?.name || "",
        slug: event?.slug || "",
        logo: event?.logo || "",
        banner: event?.banner || "",
        description: event?.description || "",
        isPeopleSequenceSuggestLimitable:
          event?.isPeopleSequenceSuggestLimitable || false,
        numberOfPeopleSequenceSuggestLimit:
          event?.numberOfPeopleSequenceSuggestLimit || 0,
      },
    }),
  });

  const [createEventType] = useCreateEventMutation({
    refetchQueries: [GetAllEventsDocument],
    awaitRefetchQueries: true,
    onCompleted(data) {
      form.reset();
      setIsOpen(false);
      // router.push(`./sales/${data.createEvent.id}`);
      toast({ title: "Evento cadastrada com sucesso" });
    },
    onError(error) {
      console.log(error); // eslint-disable-line no-console
      toast({
        title: `Erro ao cadastrar evento, ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const [updateEventType] = useUpdateEventMutation({
    refetchQueries: [GetAllEventsDocument],
    awaitRefetchQueries: true,
    onCompleted() {
      form.reset();
      setIsOpen(false);
      router.refresh();
      toast({ title: "Evento atualizada com sucesso" });
    },
    onError(error) {
      console.log(error); // eslint-disable-line no-console
      toast({
        title: `Erro ao atualizar evento, ${error.message}`,
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (event?.id) {
      await updateEventType({
        variables: {
          input: {
            id: event.id,
            name: values.name,
            slug: values.slug,
            logo: values.logo,
            banner: values.banner,
            description: values.description,
            isPeopleSequenceSuggestLimitable:
              values.isPeopleSequenceSuggestLimitable,
            numberOfPeopleSequenceSuggestLimit:
              values.numberOfPeopleSequenceSuggestLimit,
          },
        },
      });
    } else {
      await createEventType({
        variables: {
          input: {
            name: values.name,
            slug: values.slug,
            logo: values.logo,
            banner: values.banner,
            description: values.description,
            isPeopleSequenceSuggestLimitable:
              values.isPeopleSequenceSuggestLimitable,
            numberOfPeopleSequenceSuggestLimit:
              values.numberOfPeopleSequenceSuggestLimit,
          },
        },
      });
    }
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  !event &&
    form.watch("name") &&
    form.setValue("slug", removeCharacters(form.watch("name")));

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{event ? "Editar" : "Adicionar"}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{event ? "Editar" : "Cadastrar"} Evento</SheetTitle>
          <SheetDescription>
            {event ? "Editar" : "Cadastrar novo"} Evento
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormDescription>150x150</FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <FormDescription>1200x300</FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPeopleSequenceSuggestLimitable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Limitar Sugestões de Sequência de Pessoas
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      disabled={field.disabled}
                      onChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfPeopleSequenceSuggestLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Número Limite de Sugestões de Sequência de Pessoas
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : event?.id ? (
                "Atualizar"
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
