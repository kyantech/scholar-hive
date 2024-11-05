import { Megaphone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { SheetMenu } from '@/components/admin-panel/sheet-menu';
import { UserNav } from '@/components/admin-panel/user-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur px-4 sm:px-8">
      <div className="flex h-20 items-center border-b-2 dark:border-accent">
        <div className="flex items-center lg:space-x-0">
          <SheetMenu />
        </div>
        <div className="flex flex-1 items-center justify-end gap-0.5 mr-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Link href="/#">
              <MessageCircle className="w-[1.2rem] h-[1.2rem]" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Link href="/#">
              <Megaphone className="w-[1.2rem] h-[1.2rem]" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
        <UserNav />
      </div>
    </header>
  );
}
