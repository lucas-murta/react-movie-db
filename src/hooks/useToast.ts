import { useCallback, useRef } from 'react';
import { useToastContext } from '../contexts/ToastContext';
import type { ToastProps } from '../lib/component/toast/Toast.types';

export const useToast = () => {
  const { addToast, removeToast } = useToastContext();
  const addToastRef = useRef(addToast);
  addToastRef.current = addToast;

  const showToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    addToastRef.current(toast);
  }, []);

  const showSuccess = useCallback(
    (title: string, message: string, className?: string) => {
      showToast({
        status: 'positive',
        title,
        message,
        className,
      });
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message: string, className?: string) => {
      showToast({
        status: 'negative',
        title,
        message,
        className,
      });
    },
    [showToast]
  );

  return {
    showToast,
    showSuccess,
    showError,
    removeToast,
  };
};
