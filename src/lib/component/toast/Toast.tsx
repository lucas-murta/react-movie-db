import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ToastProps } from './Toast.types';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

export const Toast = ({
  status,
  title,
  message,
  className = '',
}: ToastProps) => {
  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-md border-l-4
        bg-surface-${status}
        text-content-${status}
        shadow-md
        ${className}
      `}
    >
      {status === 'positive' ? (
        <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
      ) : (
        <FontAwesomeIcon icon={faTimesCircle} className="text-xl" />
      )}
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
};
