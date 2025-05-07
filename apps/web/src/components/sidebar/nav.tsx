'use client';

import { ChevronRight } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { SideNavItemNew } from '@/types';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Nav({ itens, title }: { itens: SideNavItemNew[]; title: string }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {itens
          .filter(i => i.show)
          .map(item => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={
                pathname === item.path ||
                (!item.exact && pathname.startsWith(item.path)) ||
                (item.pathCompare && pathname.startsWith(item.pathCompare)) ||
                false // eslint-disable-line
              }
            >
              <SidebarMenuItem>
                {item.justSubMenu ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className="group">
                      {item.icon && item.icon}
                      <span>{item.title}</span>
                      <SidebarMenuAction asChild className="group-data-[state=open]:rotate-90">
                        <div>
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </div>
                      </SidebarMenuAction>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.path || '#'}
                      data-active={
                        pathname === item.path ||
                        (!item.exact && pathname.startsWith(item.path)) ||
                        (!item.exact && item.pathCompare && pathname.startsWith(item.pathCompare))
                      }
                    >
                      {item.icon && item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
                {item.subMenuItens?.length ? (
                  <>
                    {!item.justSubMenu && (
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                    )}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subMenuItens
                          ?.filter(i => i.show)
                          .map(subItem => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.path} data-active={pathname === subItem.path}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
