import { Metadata } from "next";

import { BasePage } from "@/components/base-page";
import { z } from "zod";
import { EventsTable } from "./events-table";

export const metadata: Metadata = {
  title: "Sessões",
};

export default BasePage(
  (a) => a.can("get-all", "Event"),
  ({
    searchParams: { filterFilter, pageIndex, pageSize },
    params: { eventId },
  }) => {
    return <EventsTable {...{ filterFilter, pageIndex, pageSize, eventId }} />;
  },
  z.object({
    params: z.object({
      eventId: z.string(),
    }),
  }),
);
