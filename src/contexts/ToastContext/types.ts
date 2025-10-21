import type { ToastProps } from '../../lib/component/toast/Toast.types';

export interface ToastItem extends ToastProps {
  id: string;
}

export interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}
