import { application } from '@full-stack/authorization';
import { ReactNode } from 'react';

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  exact?: boolean;
  pathCompare?: string;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  show?: boolean;
};

export type SideNavItemNew = {
  title: string;
  path: string;
  icon?: ReactNode;
  exact?: boolean;
  pathCompare?: string;
  subMenuItens?: SideNavItemNew[];
  justSubMenu?: boolean;
  show?: boolean;
};

export type SideNavGroup = {
  title: string;
  itens: SideNavItemNew[];
};

export type SideNavProps = {
  app: { user: application.User };
};
export type SideNavPropsApp = {
  app: { user: application.User };
};

export type ISideNav = (props: SideNavProps) => SideNavItem[];

export type UserAvatarMenuItem = {
  title: string;
  path?: string;
  component?: ReactNode;
};
