import { Plus } from 'lucide-react';

import { Modal, ModalSize } from './modal';
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
  size?: ModalSize;
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
  size = '4xl',
}: FormModalProps) {
  return (
    <Modal
      title={title}
      trigger={
        <Button size="icon" aria-label="Add">
          <Plus className="h-4 w-4" />
        </Button>
      }
      size={size}
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
