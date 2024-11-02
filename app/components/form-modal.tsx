import { Plus } from 'lucide-react';

import { Modal } from './modal';
import { Button } from './ui/button';

interface FormModalProps {
  title: string;
  actionLabel: string;
  cancelLabel: string;
  description: string;
  onAction: () => void;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FormModal({
  title,
  actionLabel,
  cancelLabel,
  description,
  onAction,
  children,
  open,
  onOpenChange,
}: FormModalProps) {
  return (
    <Modal
      title={title}
      trigger={
        <Button size="icon" aria-label="Add">
          <Plus className="h-4 w-4" />
        </Button>
      }
      size="4xl"
      actionLabel={actionLabel}
      onAction={onAction}
      cancelLabel={cancelLabel}
      description={description}
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </Modal>
  );
}
