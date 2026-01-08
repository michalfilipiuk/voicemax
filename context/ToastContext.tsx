import React, { createContext, useCallback, useContext, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
};

export type ToastContextType = {
  /** Current toast to display (null if none) */
  toast: Toast | null;
  /** Show a toast message */
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  /** Hide the current toast */
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export type ToastProviderProps = {
  children: React.ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    setToast(null);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const id = Date.now().toString();
      setToast({ id, message, type, duration });

      // Auto-hide after duration
      if (duration > 0) {
        const newTimeoutId = setTimeout(() => {
          setToast(null);
        }, duration);
        setTimeoutId(newTimeoutId);
      }
    },
    [timeoutId]
  );

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to access the toast context
 *
 * @example
 * const { showToast } = useToast();
 *
 * // Show a success toast
 * showToast('Item saved successfully!', 'success');
 *
 * // Show an error toast
 * showToast('Something went wrong', 'error');
 */
export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
