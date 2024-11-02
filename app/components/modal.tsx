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

interface ReusableAlertDialogProps {
  trigger: React.ReactElement;
  title?: string;
  description?: string;
  children: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  cancelLabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

export function Modal({
  trigger,
  title,
  description,
  children,
  onAction,
  actionLabel = 'Continue',
  cancelLabel = 'Cancel',
  size = 'md',
  open,
  onOpenChange,
}: ReusableAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <div onClick={() => onOpenChange?.(true)}>{trigger}</div>
      </AlertDialogTrigger>
      <AlertDialogContent className={sizeClasses[size]}>
        <X
          className="w-5 h-5 absolute top-4 right-4 cursor-pointer hover:text-foreground/80"
          aria-label="Close"
          onClick={() => onOpenChange?.(false)}
        />
        {(title || description) && (
          <AlertDialogHeader>
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {description && (
              <AlertDialogDescription className="text-foreground text-xs">{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
        )}
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          {onAction && <AlertDialogAction onClick={onAction}>{actionLabel}</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
