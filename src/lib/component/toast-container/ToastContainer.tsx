import React from 'react';
import { useToastContext } from '../../../contexts/ToastContext';
import { Toast } from '../toast/Toast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-in slide-in-from-left-full duration-300"
          onClick={() => removeToast(toast.id)}
        >
          <Toast
            status={toast.status}
            title={toast.title}
            message={toast.message}
            className={`cursor-pointer hover:opacity-90 transition-opacity ${toast.className || ''}`}
          />
        </div>
      ))}
    </div>
  );
};
