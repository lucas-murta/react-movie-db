import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useBreakpoints } from './useBreakpoints';

describe('useBreakpoints', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('should initialize with current window width', () => {
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.windowWidth).toBe(1024);
  });

  it('should detect large breakpoint correctly', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.isLg).toBe(true);
    expect(result.current.isMd).toBe(true);
    expect(result.current.isSm).toBe(true);
  });

  it('should detect small screen correctly', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.isSm).toBe(false);
    expect(result.current.isMd).toBe(false);
    expect(result.current.isLg).toBe(false);
  });

  it('should detect medium breakpoint correctly', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.isMd).toBe(true);
    expect(result.current.isSm).toBe(true);
    expect(result.current.isLg).toBe(false);
  });

  it('should detect small breakpoint correctly', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 650,
    });

    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.isSm).toBe(true);
    expect(result.current.isMd).toBe(false);
    expect(result.current.isLg).toBe(false);
  });

  it('should update breakpoints when window is resized', () => {
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.isLg).toBe(true);

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.windowWidth).toBe(600);
    expect(result.current.isSm).toBe(false);
    expect(result.current.isMd).toBe(false);
    expect(result.current.isLg).toBe(false);

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.windowWidth).toBe(800);
    expect(result.current.isMd).toBe(true);
    expect(result.current.isLg).toBe(false);
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useBreakpoints());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
