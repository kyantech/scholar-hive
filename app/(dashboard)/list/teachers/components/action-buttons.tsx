import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function ActionButtons({ teacherId }: { teacherId: string }) {
  return (
    <div className="flex space-x-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`teachers/${teacherId}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
