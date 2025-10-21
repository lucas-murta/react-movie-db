import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useToast } from './useToast';

const mockAddToast = vi.fn();
const mockRemoveToast = vi.fn();

vi.mock('../contexts/ToastContext', () => ({
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
    const toast = useToast();

    expect(toast.showToast).toBeDefined();
    expect(toast.showSuccess).toBeDefined();
    expect(toast.showError).toBeDefined();
    expect(toast.removeToast).toBeDefined();
    expect(typeof toast.showToast).toBe('function');
    expect(typeof toast.showSuccess).toBe('function');
    expect(typeof toast.showError).toBe('function');
    expect(typeof toast.removeToast).toBe('function');
  });

  it('should call addToast when showToast is called', () => {
    const toast = useToast();
    const toastData = {
      status: 'positive' as const,
      title: 'Test Title',
      message: 'Test Message',
    };

    toast.showToast(toastData);

    expect(mockAddToast).toHaveBeenCalledWith(toastData);
    expect(mockAddToast).toHaveBeenCalledTimes(1);
  });

  it('should call addToast with positive status when showSuccess is called', () => {
    const toast = useToast();

    toast.showSuccess('Success Title', 'Success Message');

    expect(mockAddToast).toHaveBeenCalledWith({
      status: 'positive',
      title: 'Success Title',
      message: 'Success Message',
    });
    expect(mockAddToast).toHaveBeenCalledTimes(1);
  });

  it('should call addToast with negative status when showError is called', () => {
    const toast = useToast();

    toast.showError('Error Title', 'Error Message');

    expect(mockAddToast).toHaveBeenCalledWith({
      status: 'negative',
      title: 'Error Title',
      message: 'Error Message',
    });
    expect(mockAddToast).toHaveBeenCalledTimes(1);
  });

  it('should call removeToast when removeToast is called', () => {
    const toast = useToast();
    const toastId = 'test-id';

    toast.removeToast(toastId);

    expect(mockRemoveToast).toHaveBeenCalledWith(toastId);
    expect(mockRemoveToast).toHaveBeenCalledTimes(1);
  });
});
