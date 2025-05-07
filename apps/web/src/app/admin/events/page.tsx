import { Metadata } from "next";

import { BasePageJustBaseFilter } from "@/components/base-page";
import { EventsTable } from "./events-table";

export const metadata: Metadata = {
  title: "Eventos",
};

export default BasePageJustBaseFilter(
  (a) => a.can("get-all", "Event"),
  ({ searchParams: { filterFilter, pageIndex, pageSize } }) => {
    return <EventsTable {...{ filterFilter, pageIndex, pageSize }} />;
  },
);
