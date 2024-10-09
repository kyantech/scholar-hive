import { useTheme } from 'next-themes';
import Image from 'next/image';

import { Menu } from '@/components/admin-panel/menu';
import { SidebarToggle } from '@/components/admin-panel/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { USER_ROLE } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { theme } = useTheme();

  if (!sidebar) return null;

  const logoSrc = (isOpen: boolean) => {
    if (isOpen) {
      return theme === 'dark' ? '/logo_big_dark_mode.svg' : '/logo_big.svg';
    } else {
      return theme === 'dark' ? '/logo_small_dark_mode.svg' : '/logo_small.svg';
    }
  };

  return (
    <aside
      className={cn(
        'hidden lg:block fixed top-0 left-0 bottom-0 z-20 -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 m-2 mr-0 rounded-md bg-background border',
        sidebar?.isOpen === false ? 'w-[82px]' : 'w-[280px]'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex flex-col w-full px-3 py-4 overflow-y-auto">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <div className={cn('flex items-center gap-2', sidebar.isOpen === false && '-ml-1')}>
            <Image
              src={logoSrc(sidebar?.isOpen)}
              alt="logo"
              className={sidebar.isOpen ? 'mt-6' : 'mt-3'}
              width={sidebar?.isOpen ? 200 : 32}
              height={32}
            />
          </div>
        </Button>
        {/*TODO: find dinamic user role */}
        <Menu isOpen={sidebar?.isOpen} userRole={USER_ROLE} />
      </div>
    </aside>
  );
}
