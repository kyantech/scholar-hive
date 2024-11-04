'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface ModalProps {
  trigger: React.ReactElement;
  title?: string;
  description?: string;
  children: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  cancelLabel?: string;
  size?: ModalSize;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MODAL_SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

const DEFAULT_ACTION_LABEL = 'Continue';
const DEFAULT_CANCEL_LABEL = 'Cancel';
const DEFAULT_SIZE: ModalSize = 'md';

export function Modal({
  trigger,
  title,
  description,
  children,
  onAction,
  actionLabel = DEFAULT_ACTION_LABEL,
  cancelLabel = DEFAULT_CANCEL_LABEL,
  size = DEFAULT_SIZE,
  open,
  onOpenChange,
}: ModalProps) {
  const handleClose = () => onOpenChange?.(false);

  const renderHeader = () => {
    if (!title && !description) return null;

    return (
      <AlertDialogHeader>
        {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
        {description && (
          <AlertDialogDescription className="text-foreground text-xs">{description}</AlertDialogDescription>
        )}
      </AlertDialogHeader>
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={MODAL_SIZE_CLASSES[size]}>
        <X
          className="w-5 h-5 absolute top-4 right-4 cursor-pointer hover:text-foreground/80"
          aria-label="Close"
          onClick={handleClose}
        />
        {renderHeader()}
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>{cancelLabel}</AlertDialogCancel>
          {onAction && <AlertDialogAction onClick={onAction}>{actionLabel}</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
