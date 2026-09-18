'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Inline error alert. Announced to screen readers the moment it appears. */
export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
      {message}
    </p>
  );
}

/** Message shown under a field the server rejected. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-red-700">
      {message}
    </p>
  );
}

/** Success panel replacing a form after a completed submission. */
export function FormSuccess({
  title,
  body,
  actionLabel,
  onReset,
  icon: Icon = CheckCircle2,
}: {
  title: string;
  body: string;
  actionLabel: string;
  onReset: () => void;
  icon?: React.ElementType;
}) {
  return (
    <div className="text-center py-8" role="status">
      <span className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-green-700" aria-hidden="true" />
      </span>
      <h3 className="font-bold text-navy-900 mb-1">{title}</h3>
      <p className="text-slate-600 text-sm mb-4">{body}</p>
      <Button onClick={onReset} variant="outline" size="sm">
        {actionLabel}
      </Button>
    </div>
  );
}

/** Submit button that shows progress and cannot be double-fired. */
export function SubmitButton({
  isSubmitting,
  label,
  sendingLabel,
  icon: Icon,
}: {
  isSubmitting: boolean;
  label: string;
  sendingLabel: string;
  icon?: React.ElementType;
}) {
  return (
    <Button type="submit" size="lg" variant="default" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          {sendingLabel}
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
          {label}
        </>
      )}
    </Button>
  );
}

/**
 * Hidden field that bots fill in and humans do not.
 *
 * A trip is logged server-side rather than silently discarded, so if a real
 * visitor's browser ever autofills it the enquiry is still recoverable.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      name="_honey"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="hidden"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  );
}
