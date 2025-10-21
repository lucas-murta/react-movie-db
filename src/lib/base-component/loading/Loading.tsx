import type { LoadingProps } from './Loading.types';

const Loading = ({ className = '', text }: LoadingProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <div
        className="w-8 h-8 border-2 border-border-0 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
      {text && <span className="text-base text-content-ghost">{text}</span>}
    </div>
  );
};

export default Loading;
