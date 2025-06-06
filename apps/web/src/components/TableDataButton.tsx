import { CellContext, Column, RowData } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import React, { ReactNode } from 'react';
import { PolicyAppHandlerCallback } from '@/utils/app-ability';
import { DataType, tableDataParser, tableDataParserNew } from './TableDataParser';

import { Button } from './ui/button';

// import { Container } from './styles';

export const TableDataButton: React.FC<{
  column: Column<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  children: ReactNode;
}> = ({ column, children }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      data-text={children}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const tableDataButton =
  (label: string) =>
  ({ column }: {column: Column<any>}) => <TableDataButton column={column}>{label}</TableDataButton>// eslint-disable-line

export function tdb<TData extends RowData>(
  name: TData extends RowData ? keyof TData : string,
  label: string,
  dataType?: DataType,
  cell?: (c: CellContext<any, unknown>) => any,
  other?: any,
) {
  return {
    ...{
      accessorKey: name,
      header: tableDataButton(label),
    },
    ...(cell ? { cell } : dataType ? { cell: tableDataParser(dataType) } : {}),
    ...other,
  };
}

export function tdbNew<TData extends RowData>({
  name,
  label,
  dataType,
  cell,
  other,
  columns,
  a,
  id,
  enableHiding,
  parse,
}: {
  name?: TData extends RowData ? keyof TData : string;
  label?: string;
  dataType?: DataType;
  cell?: (c: CellContext<any, unknown>) => any;
  other?: any;

  columns?: Column<any>[];

  a?: PolicyAppHandlerCallback;

  id?: string;
  enableHiding?: boolean;

  parse?: (data: any) => any;
}) {
  return {
    ...{
      accessorKey: name,
      header: label && tableDataButton(label),
      id,
      enableHiding,
    },
    ...(cell
      ? { cell }
      : dataType
        ? { cell: tableDataParserNew({ type: dataType, columns, a, parse }) }
        : {}),
    ...other,
  };
}
