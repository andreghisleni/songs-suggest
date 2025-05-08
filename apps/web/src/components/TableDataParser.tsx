import { CellContext, Column } from "@tanstack/react-table";
import React from "react";

import { format } from "date-fns";
import { inputPhoneMask } from "@/utils/inputMasks";
import { PolicyAppHandlerCallback } from "@/utils/app-ability";
import { useAuth } from "@/hooks/auth";
import { formatToBRL } from "@/utils/formatToBRL";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FileViewer } from "./file-viewer";
import { DataTable } from "./data-table";
import { ShowJson } from "./show-json";
import ZoomableImage from "./zoomable-image";

/* eslint react/display-name: off */

// import { Container } from "./styles";

export type DataType =
  | "date-time"
  | "date"
  | "time"
  | "phone"
  | "array"
  | "file"
  | "table"
  | "currency"
  | "object"
  | "image";

export const TableDataTime: React.FC<{
  cellContext: CellContext<any, unknown>;
  type?: DataType;
  columns?: Column<any>[];
  a?: PolicyAppHandlerCallback;

  parse?: (data: any) => any;
}> = ({
  cellContext: { getValue, row },
  type = "date-time",
  columns,
  a,
  parse,
}) => {
  const {
    ability: { app },
  } = useAuth();

  if (a) {
    if (!app) return null;

    if (!a(app)) return null;
  }

  if (!getValue<string | Date | null>()) return null;

  if (type === "phone") {
    return (
      <span>
        {!!getValue<string>() && getValue<string>() !== ""
          ? inputPhoneMask(getValue<string>())
          : "-"}
      </span>
    );
  }

  if (type === "time" || type === "date" || type === "date-time") {
    const v = getValue<string | Date | null | undefined>();

    if (!v) return <span>-</span>;

    if (v.toString() === "Invalid Date") {
      return <span>-</span>;
    }

    return (
      <span>
        {format(
          new Date(v || ""),
          type === "date-time"
            ? "dd/MM/yyyy HH:mm"
            : type === "date"
              ? "dd/MM/yyyy"
              : "HH:mm",
        )}
      </span>
    );
  }

  if (type === "image") {
    const fileUrl = getValue<string | null>();

    if (!fileUrl) return <span>-</span>;

    return (
      <div className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-lg">
        <ZoomableImage
          src={fileUrl}
          alt="Imagem"
          className="h-[48px] w-[48px] rounded-xs object-cover"
        />
      </div>
    );
  }

  if (type === "file") {
    const fileUrl = getValue<string | null>();

    if (!fileUrl) return <span>-</span>;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Arquivo</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Arquivo</DialogTitle>
          </DialogHeader>
          <div className="h-[502px]">
            <FileViewer url={fileUrl} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (type === "table") {
    const d = getValue<any>();

    if (!d) return <span>-</span>;
    if (!columns) return <span>a</span>;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ver</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          {/* <DialogHeader>
            <DialogTitle>Arquivo</DialogTitle>
          </DialogHeader> */}

          <DataTable columns={columns} data={d || []} />
        </DialogContent>
      </Dialog>
    );
  }

  if (type === "object") {
    const d = getValue<any>();

    if (!d) return <span>-</span>;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ver</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <ShowJson data={typeof d === "object" ? d : JSON.parse(d)} />
        </DialogContent>
      </Dialog>
    );
  }

  if (type === "array") {
    const d = getValue<any[]>();

    if (!d) return <span>-</span>;

    return <span>{d.join(", ")}</span>;
  }

  if (type === "currency") {
    if (parse) {
      const d = parse(row);
      if (!d) return <span>-</span>;

      return <span>{formatToBRL(d)}</span>;
    }

    const d = getValue<number>();

    if (!d) return <span>-</span>;

    return <span>{formatToBRL(d)}</span>;
  }

  return <span>{getValue<string | null>() || "-"}</span>;
};

export const tableDataParser =
  (
    type?: DataType,
    columns?: Column<any>[],
    a?: PolicyAppHandlerCallback,
    parse?: (data: any) => any,
  ) =>
  (cellContext: CellContext<any, unknown>) => (
    <TableDataTime {...{ cellContext, type, columns, a, parse }} />
  );
export const tableDataParserNew =
  (pa: {
    type?: DataType;
    columns?: Column<any>[];
    a?: PolicyAppHandlerCallback;
    parse?: (data: any) => any;
  }) =>
  (cellContext: CellContext<any, unknown>) => (
    <TableDataTime {...{ cellContext, ...pa }} />
  );
