'use client';

import { Ellipsis, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/actions/auth';
import { CollapseMenuButton } from '@/components/admin-panel/collapse-menu-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getMenuList } from '@/lib/menu-list';
import { cn } from '@/lib/utils';

interface MenuProps {
  isOpen: boolean | undefined;
  userRole: UserRole;
}

type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export function Menu({ isOpen, userRole }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <div className="flex flex-col h-[calc(100vh-84px)]">
      <ScrollArea className="flex-1 w-full">
        <nav className="mt-8">
          <ul className="flex flex-col items-start space-y-1 px-2">
            {menuList.map(({ groupLabel, menus }, index) => (
              <li key={index} className="w-full">
                <div className="flex items-center mb-4">
                  {isOpen ? (
                    <h2 className="px-2 text-base font-semibold tracking-tight text-muted-foreground">{groupLabel}</h2>
                  ) : (
                    <div className="w-full flex justify-center">
                      <Ellipsis size={18} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                {menus
                  .filter((menu) => menu.visible.includes(userRole))
                  .map(({ href, label, icon: Icon, active, submenus }, index) =>
                    submenus.length === 0 ? (
                      <div className="w-full" key={index}>
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={active ? 'secondary' : 'ghost'}
                                className={cn(
                                  'h-10 mb-1',
                                  isOpen === false ? 'w-10 p-0 justify-center' : 'w-full justify-start'
                                )}
                                asChild
                              >
                                <Link href={href}>
                                  <span className={cn(isOpen === false ? 'ml-2.5' : 'mr-4')}>
                                    <Icon size={18} />
                                  </span>
                                  <p
                                    className={cn(
                                      'max-w-[200px] truncate',
                                      isOpen === false ? '-translate-x-96 opacity-0' : 'translate-x-0 opacity-100'
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <div className="w-full" key={index}>
                        <CollapseMenuButton
                          icon={Icon}
                          label={label}
                          active={active}
                          submenus={submenus.filter((submenu) => submenu.visible.includes(userRole))}
                          isOpen={isOpen}
                        />
                      </div>
                    )
                  )}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      <div className="p-2">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button onClick={() => logout()} variant="outline" className="w-full justify-center h-10">
                <span className={cn(isOpen === false ? '' : 'mr-4')}>
                  <LogOut size={18} />
                </span>
                <p className={cn('whitespace-nowrap', isOpen === false ? 'opacity-0 hidden' : 'opacity-100')}>
                  Sign out
                </p>
              </Button>
            </TooltipTrigger>
            {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
