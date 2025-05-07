import { ColumnDef } from '@tanstack/react-table';
import { tdb } from '@/components/TableDataButton';
import { Button } from '@/components/ui/button';
import { Responsible } from '@/app/app/[slug]/group/responsibles/columns';
import { ResponsibleTypeEnum } from '@/app/app/[slug]/group/responsibles/responsible-form';

export const columns = ({
  onSelect,
}: {
  onSelect: (responsible: Responsible) => void;
}): ColumnDef<Responsible>[] => [
  tdb('name', 'Nome'),
  tdb('email', 'Email'),
  tdb('phone', 'Telefone', 'phone'),
  tdb(
    'type',
    'Tipo',
    undefined,
    ({ getValue }) => ResponsibleTypeEnum[getValue<ResponsibleTypeEnum>()],
  ),
  tdb('work', 'Trabalho'),
  tdb('workPhone', 'Telefone do trabalho', 'phone'),
  tdb('totalMembers', 'Total de membros'),

  tdb('createdAt', 'Cadastrado em', 'date-time'),

  {
    id: 'actions',
    header: () => <span>Ações</span>,
    cell: ({ row }) => {
      return <Button onClick={() => onSelect(row.original)}>Selecionar</Button>;
    },
    meta: {
      className: 'sticky right-0',
    },
  },
];
