'use client';

import * as React from 'react';
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Shield,
  Square,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SideNavGroup, UserAvatarMenuItem } from '@/types';
import Link from 'next/link';
import { getNameInitials } from '@/utils/get-name-initials';
import { NavUser } from './nav-user';
import { Nav } from './nav';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThemeSwitcherSidebar } from './theme-switcher-sidebar';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: Square,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  groups: SideNavGroup[];
  userAvatarMenuItens: UserAvatarMenuItem[];
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  company?: {
    name: string;
    slug: string;
    avatarUrl?: string;
  };
};

export function AppSidebar({
  groups,
  userAvatarMenuItens,
  user,
  company,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={company ? `/app/${company.slug}` : '/admin'}>
                {company ? (
                  company?.avatarUrl ? (
                    <Avatar className="size-10 rounded-lg">
                      <AvatarImage src={company.avatarUrl} alt={company.name} />
                      <AvatarFallback className="rounded-lg">
                        {getNameInitials(company?.name)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                      <Command className="size-8" />
                    </div>
                  )
                ) : (
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                    <Shield className="size-8" />
                  </div>
                )}

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {company ? `G.E. ${company.name}` : 'Financeiro'}
                  </span>
                  <span className="truncate text-xs">Marcon Numismatica</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {groups?.map(group => <Nav key={group.title} title={group.title} itens={group.itens} />)}
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcherSidebar />
        <NavUser user={user} userAvatarMenuItens={userAvatarMenuItens} />
      </SidebarFooter>
    </Sidebar>
  );
}
