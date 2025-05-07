'use client';

import { SideNavGroup } from '@/types';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export function BreadcrumbSidebar({ groups }: { groups: SideNavGroup[] }) {
  const pathname = usePathname();

  const selectedItem = groups
    .flatMap(group => group.itens)
    .map(item => ({ ...item, icon: undefined }))
    .find(
      item =>
        item.path === pathname ||
        item.pathCompare === pathname ||
        (!item.exact && pathname.startsWith(item.path)),
    );

  const submenu = selectedItem?.subMenuItens
    ?.map(item => ({ ...item, icon: undefined }))
    .find(item => item.path === pathname);

  if (!selectedItem) {
    return null;
  }

  const parsedGroups = groups.map(group => ({
    ...group,
    itensPath: group.itens.map(item => item.path),
    itens: undefined,
  }));

  const selectedGroup = parsedGroups.find(group => group.itensPath.includes(selectedItem.path));

  // return (
  //   <Dialog>
  //     <DialogTrigger>Open</DialogTrigger>
  //     <DialogContent>
  //       <ShowJson data={{ selectedGroup }} />
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {selectedGroup && selectedGroup.title !== '' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedGroup.title}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        {submenu ? (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={selectedItem.path}>{selectedItem.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{submenu.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>{selectedItem.title}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
