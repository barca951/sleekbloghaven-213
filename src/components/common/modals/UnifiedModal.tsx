import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: ModalSize;
  type?: ModalType;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg', 
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]'
};

const typeIcons: Record<ModalType, React.ReactNode> = {
  default: null,
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  error: <AlertCircle className="w-5 h-5 text-red-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />
};

const typeColors: Record<ModalType, string> = {
  default: '',
  success: 'border-l-4 border-green-500',
  error: 'border-l-4 border-red-500', 
  warning: 'border-l-4 border-yellow-500',
  info: 'border-l-4 border-blue-500'
};

export function UnifiedModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  type = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
  headerClassName,
  contentClassName
}: UnifiedModalProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={cn(
          sizeClasses[size],
          typeColors[type],
          'max-h-[90vh] overflow-y-auto',
          className
        )}
      >
        {(title || description || showCloseButton) && (
          <DialogHeader className={cn('relative', headerClassName)}>
            {title && (
              <DialogTitle className="flex items-center gap-2 pr-8">
                {typeIcons[type]}
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 p-2"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Fermer</span>
              </Button>
            )}
          </DialogHeader>
        )}
        
        <div className={cn('space-y-4', contentClassName)}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}