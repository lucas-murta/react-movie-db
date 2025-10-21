import { useToastContext } from '../contexts/ToastContext';
import type { ToastProps } from '../lib/component/toast/Toast.types';

export const useToast = () => {
  const { addToast, removeToast } = useToastContext();

  const showToast = (toast: Omit<ToastProps, 'id'>) => {
    addToast(toast);
  };

  const showSuccess = (title: string, message: string, className?: string) => {
    showToast({
      status: 'positive',
      title,
      message,
      className,
    });
  };

  const showError = (title: string, message: string, className?: string) => {
    showToast({
      status: 'negative',
      title,
      message,
      className,
    });
  };

  return {
    showToast,
    showSuccess,
    showError,
    removeToast,
  };
};
