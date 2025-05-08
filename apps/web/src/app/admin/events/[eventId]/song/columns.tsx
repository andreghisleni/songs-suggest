"use client";

import { tdb } from "@/components/TableDataButton";

import { GetEventByIdWithSongsQuery } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { SetPlayedButton } from "./set-played-button";
import { SetRejectedButton } from "./set-rejected-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sale = GetEventByIdWithSongsQuery["event"]["songs"][0];

export const columns: ColumnDef<Sale>[] = [
  tdb("name", "Nome"),
  tdb("artist", "Artista"),
  tdb("suggestedByName", "Sugerido por"),
  tdb("image", "Image", "image"),

  tdb("isPlayed", "Tocada"),
  tdb("isRejected", "Rejeitada"),

  tdb("createdAt", "Criado em", "date-time"),

  {
    header: "Ações",
    accessorKey: "id",
    cell: ({ row }) => (
      <>
        {!row.original.isPlayed && <SetPlayedButton id={row.original.id} />}
        {!row.original.isRejected && <SetRejectedButton id={row.original.id} />}
      </>
    ),
  },
];
