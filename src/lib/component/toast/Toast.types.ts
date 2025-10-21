export type ToastStatus = 'positive' | 'negative';

export interface ToastProps {
  status: ToastStatus;
  title: string;
  message: string;
  className?: string;
}
