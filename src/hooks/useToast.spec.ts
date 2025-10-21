import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToast } from './useToast';
import { ToastProvider } from '../contexts/ToastContext';

const mockAddToast = vi.fn();
const mockRemoveToast = vi.fn();

vi.mock('../contexts/ToastContext', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
  useToastContext: () => ({
    addToast: mockAddToast,
    removeToast: mockRemoveToast,
    toasts: [],
  }),
}));

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide toast functions', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    expect(result.current.showToast).toBeDefined();
    expect(result.current.showSuccess).toBeDefined();
    expect(result.current.showError).toBeDefined();
    expect(result.current.removeToast).toBeDefined();
    expect(typeof result.current.showToast).toBe('function');
    expect(typeof result.current.showSuccess).toBe('function');
    expect(typeof result.current.showError).toBe('function');
    expect(typeof result.current.removeToast).toBe('function');
  });

  it('should call addToast when showToast is called', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });
    const toastData = {
      status: 'positive' as const,
      title: 'Test Title',
      message: 'Test Message',
    };

    result.current.showToast(toastData);

    expect(mockAddToast).toHaveBeenCalledWith(toastData);
    expect(mockAddToast).toHaveBeenCalledTimes(1);
  });

  it('should call addToast with positive status when showSuccess is called', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.showSuccess('Success Title', 'Success Message');

    expect(mockAddToast).toHaveBeenCalledWith({
      status: 'positive',
      title: 'Success Title',
      message: 'Success Message',
    });
    expect(mockAddToast).toHaveBeenCalledTimes(1);
  });

  it('should call addToast with negative status when showError is called', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.showError('Error Title', 'Error Message');

    expect(mockAddToast).toHaveBeenCalledWith({
      status: 'negative',
      title: 'Error Title',
      message: 'Error Message',
    });
    expect(mockAddToast).toHaveBeenCalledTimes(1);
  });

  it('should call removeToast when removeToast is called', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });
    const toastId = 'test-id';

    result.current.removeToast(toastId);

    expect(mockRemoveToast).toHaveBeenCalledWith(toastId);
    expect(mockRemoveToast).toHaveBeenCalledTimes(1);
  });
});
