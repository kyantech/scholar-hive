'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { USER_ROLE } from '@/lib/data';

export function UserNav() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <span className="text-sm leading-3 font-medium">John Doe</span>
        <span className="text-xs text-gray-500 text-right">{USER_ROLE}</span>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
