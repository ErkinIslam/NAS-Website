'use client';

import { useCallback, useRef, useState } from 'react';
import { useLang, useLanguage } from './i18n';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface SubmitOptions<T> {
  /** Cleared field values applied after a successful send. */
  initial: T;
  onReset?: () => void;
}

export interface FormSubmitState<T> {
  status: SubmitStatus;
  /** Message to render in the error alert, or null when there is none. */
  error: string | null;
  /** Per-field messages returned by the server, keyed by field name. */
  fieldErrors: Record<string, string>;
  isSubmitting: boolean;
  submit: (payload: T & Record<string, unknown>) => Promise<void>;
  /** Return to the empty form after a success. */
  reset: () => void;
  /** Clear only the error state, e.g. when the user edits a field. */
  clearError: () => void;
}

/**
 * Shared submit pipeline for all three forms.
 *
 * Centralising this fixes, in one place, what were three separate copies of
 * the same gaps: no in-flight state (so the submit button stayed live and a
 * double click sent two emails), no form reset after success, and an error
 * banner that was never cleared once shown.
 */
export function useFormSubmit<T extends Record<string, unknown>>(
  opts: SubmitOptions<T>,
): FormSubmitState<T> & { values: T; setValues: React.Dispatch<React.SetStateAction<T>> } {
  const { t } = useLanguage();
  const lang = useLang();
  const [values, setValues] = useState<T>(opts.initial);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Guards against a second submit slipping through before React re-renders
  // with the disabled button.
  const inFlight = useRef(false);

  const clearError = useCallback(() => {
    setError(null);
    setFieldErrors({});
    setStatus((s) => (s === 'error' ? 'idle' : s));
  }, []);

  const submit = useCallback(
    async (payload: T & Record<string, unknown>) => {
      if (inFlight.current) return;
      inFlight.current = true;
      setStatus('submitting');
      setError(null);
      setFieldErrors({});

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, lang }),
        });

        if (res.ok) {
          setStatus('success');
          setValues(opts.initial);
          opts.onReset?.();
          return;
        }

        if (res.status === 429) {
          setError(t('form.error.rate'));
        } else if (res.status === 400) {
          const body = await res.json().catch(() => null);
          const fields: Record<string, string> = {};
          if (body && Array.isArray(body.fields)) {
            for (const f of body.fields) {
              if (f && typeof f.field === 'string' && typeof f.message === 'string') {
                fields[f.field] = f.message;
              }
            }
          }
          setFieldErrors(fields);
          setError(t('form.error.invalid'));
        } else {
          setError(t('form.error.generic'));
        }
        setStatus('error');
      } catch {
        // fetch only rejects on a genuine network failure.
        setError(t('form.error.network'));
        setStatus('error');
      } finally {
        inFlight.current = false;
      }
    },
    [lang, t, opts],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setFieldErrors({});
  }, []);

  return {
    values,
    setValues,
    status,
    error,
    fieldErrors,
    isSubmitting: status === 'submitting',
    submit,
    reset,
    clearError,
  };
}
