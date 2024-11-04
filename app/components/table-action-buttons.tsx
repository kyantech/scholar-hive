import { Edit2, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { USER_ROLE } from '@/lib/data';

interface TableActionButtonsProps {
  viewHref: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TableActionButtons({ viewHref, onEdit, onDelete }: TableActionButtonsProps) {
  const isAdmin = USER_ROLE === 'admin';
  const iconSize = 'h-4 w-4';

  const renderEditButton = () => (
    <Button variant="ghost" size="icon" onClick={onEdit} disabled={!isAdmin}>
      <Edit2 className={iconSize} />
    </Button>
  );

  const renderViewButton = () => (
    <Button variant="ghost" size="icon" asChild>
      <Link href={viewHref}>
        <Eye className={iconSize} />
      </Link>
    </Button>
  );

  const renderDeleteButton = () => (
    <Button variant="ghost" size="icon" onClick={onDelete} disabled={!isAdmin}>
      <Trash2 className={iconSize} />
    </Button>
  );

  return (
    <div className="flex space-x-2">
      {renderEditButton()}
      {renderViewButton()}
      {renderDeleteButton()}
    </div>
  );
}
