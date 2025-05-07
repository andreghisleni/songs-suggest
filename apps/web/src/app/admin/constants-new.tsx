import { application } from '@full-stack/authorization';
import { SideNavGroup, SideNavProps, UserAvatarMenuItem } from '@/types';
import { UserServer } from '@/utils/get-server';
import {
  BadgeDollarSign,
  FileDown,
  FileText,
  Home,
  MessageSquareMore,
  Users,
  Workflow,
} from 'lucide-react';

export const SideNavAdminItens = ({ app: { user } }: SideNavProps): SideNavGroup[] => {
  const ability = application.defineAbilityFor(user);

  return [
    {
      title: '',
      itens: [
        {
          title: 'Home',
          path: '/admin',
          icon: <Home />,
          exact: true,
          show: true,
        },
        {
          title: 'Usuários',
          path: '/admin/users',
          icon: <Users />,
          show: ability.can('get', 'User'),
        },
        {
          title: 'Exportar venda',
          path: '/admin/export-sale-extract',
          icon: <FileDown />,
          show: ability.can('get', 'Sale'),
        },
        {
          title: 'Integrações de pagamento',
          path: '/admin/payment-integrations',
          icon: <Workflow />,
          show: ability.can('get', 'PaymentIntegration'),
        },
        {
          title: 'Pagamentos',
          path: '/admin/payments',
          icon: <BadgeDollarSign />,
          show: ability.can('get', 'Payment'),
        },
      ],
    },
    {
      title: 'Fechamentos',
      itens: [
        {
          title: 'Fechamentos',
          path: '/admin/closings',
          icon: <FileText />,
          show: ability.can('get', 'Closing'),
        },
        {
          title: 'Final da mensagem',
          path: '/admin/whatsapp-end-message',
          icon: <MessageSquareMore />,
          show: ability.can('get', 'WhatsappEndMessage'),
        },
      ],
    },
    {
      title: 'Cobranças',
      itens: [
        {
          title: 'Cobranças',
          path: '/admin/debtors',
          icon: <FileText />,
          show: ability.can('get', 'Debtor'),
        },
        {
          title: 'Mensagens de cobrança',
          path: '/admin/whatsapp-debtor-message',
          icon: <MessageSquareMore />,
          show: ability.can('get-all', 'WhatsappDebtorMessage'),
        },
      ],
    },
  ];
};

export const USER_AVATAR_MENU_ITEMS = ({ member_on }: UserServer): UserAvatarMenuItem[] => [
  {
    title: member_on.length === 1 ? 'Acessar organização' : 'Selecionar organização',
    path:
      member_on.length === 1 ? `/app/${member_on[0].organization.slug}` : '/select-organization',
  },
];
