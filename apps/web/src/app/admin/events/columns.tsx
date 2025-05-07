"use client";

import { ColumnDef } from "@tanstack/react-table";

import { tdb } from "@/components/TableDataButton";

import { GetAllEventsQuery } from "@/generated/graphql";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventForm } from "./event-form";
import { ToggleEventButton } from "./re-run-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = GetAllEventsQuery["events"][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Event>[] => [
  tdb("name", "Nome"),
  tdb("description", "Descrição"),
  tdb("slug", "Slug"),
  tdb("logo", "Logo"),
  tdb("banner", "Banner"),
  tdb("isOpenedToReceiveSuggestions", "Aberto a Sugestões"),
  tdb("isPeopleSequenceSuggestLimitable", "Limite"),
  tdb("numberOfPeopleSequenceSuggestLimit", "Número limite"),

  tdb("createdAt", "Criado em", "date-time"),
  tdb("updatedAt", "Atualizado em", "date-time"),

  {
    header: "Ações",
    accessor: "id",
    cell: ({ row }) => (
      <>
        <EventForm event={row.original} />
        <ToggleEventButton eventId={row.original.id} />
        <Button asChild>
          <Link href={`events/${row.original.id}/sales`}>Abrir</Link>
        </Button>
      </>
    ),
  },
];
