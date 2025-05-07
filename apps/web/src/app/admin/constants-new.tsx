import { application } from "@full-stack/authorization";
import { SideNavGroup, SideNavProps, UserAvatarMenuItem } from "@/types";
import { UserServer } from "@/utils/get-server";
import { FileDown, Home, Users } from "lucide-react";

export const SideNavAdminItens = ({
  app: { user },
}: SideNavProps): SideNavGroup[] => {
  const ability = application.defineAbilityFor(user);

  return [
    {
      title: "",
      itens: [
        {
          title: "Home",
          path: "/admin",
          icon: <Home />,
          exact: true,
          show: true,
        },
        {
          title: "Usuários",
          path: "/admin/users",
          icon: <Users />,
          show: ability.can("get", "User"),
        },
        {
          title: "Eventos",
          path: "/admin/events",
          icon: <FileDown />,
          show: ability.can("get", "Event"),
        },
      ],
    },
  ];
};

export const USER_AVATAR_MENU_ITEMS = ({
  member_on,
}: UserServer): UserAvatarMenuItem[] => [
  {
    title:
      member_on.length === 1 ? "Acessar organização" : "Selecionar organização",
    path:
      member_on.length === 1
        ? `/app/${member_on[0].organization.slug}`
        : "/select-organization",
  },
];
