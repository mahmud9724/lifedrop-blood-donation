import { forwardRef, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { AlertTriangle, CircleAlert, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export const describedBy = (id: string, hint: boolean, error: string | undefined) =>
  [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;

export const controlClass = (error: string | undefined) =>
  cn(
    'h-12 w-full min-w-0 rounded-lg border bg-background px-3.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/80 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60',
    error ? 'border-destructive bg-primary-soft/40' : 'border-input',
  );

export function Required() {
  return (
    <>
      <span aria-hidden className="ml-0.5 text-destructive">*</span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

export function FieldError({ id, error }: { id: string; error: string | undefined }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-destructive">
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span><span className="sr-only">Error: </span>{error}</span>
    </p>
  );
}

export function Hint({ id, children }: { id: string; children: ReactNode }) {
  return <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted-foreground">{children}</p>;
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error: string | undefined;
  className?: string;
  children: ReactNode;
}
/** Label + control + hint + error. The control receives its own aria props via `describedBy`. */
export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label}
        {required ? <Required /> : <span className="ml-1.5 text-xs font-normal text-muted-foreground">(optional)</span>}
      </label>
      {hint && <Hint id={id}>{hint}</Hint>}
      <div className="mt-2">{children}</div>
      <FieldError id={id} error={error} />
    </div>
  );
}

interface Option { value: string; label: string; hint?: string }
interface ChoiceGroupProps {
  id: string;
  name: string;
  legend: string;
  required?: boolean;
  hint?: ReactNode;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error: string | undefined;
  columns?: 'two' | 'three' | 'four';
  compact?: boolean;
}
const columnClass = { two: 'sm:grid-cols-2', three: 'sm:grid-cols-3', four: 'sm:grid-cols-2 lg:grid-cols-4' };
/** Radio group rendered as selectable cards, built on native radios for keyboard and screen-reader support. */
export function ChoiceGroup({ id, name, legend, required, hint, options, value, onChange, error, columns = 'two', compact }: ChoiceGroupProps) {
  return (
    <fieldset id={id} aria-describedby={describedBy(id, Boolean(hint), error)} className="min-w-0">
      <legend className="text-sm font-semibold text-foreground">{legend}{required ? <Required /> : null}</legend>
      {hint && <Hint id={id}>{hint}</Hint>}
      <div className={cn('mt-2 grid gap-3', compact ? 'grid-cols-4' : 'grid-cols-1', columnClass[columns])}>
        {options.map(o => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                'relative flex cursor-pointer rounded-xl border bg-background transition-colors hover:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                compact ? 'items-center justify-center px-2 py-3' : 'flex-col gap-0.5 px-4 py-3',
                checked ? 'border-primary bg-primary-soft text-secondary' : error ? 'border-destructive' : 'border-input',
              )}
            >
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="sr-only" />
              <span className={cn('font-semibold', compact ? 'text-base' : 'text-sm')}>{o.label}</span>
              {o.hint && <span className="text-xs text-muted-foreground">{o.hint}</span>}
            </label>
          );
        })}
      </div>
      <FieldError id={id} error={error} />
    </fieldset>
  );
}

interface SummaryProps { errors: { field: string; id: string; label: string; message: string }[] }
export const ErrorSummary = forwardRef<HTMLDivElement, SummaryProps>(function ErrorSummary({ errors }, ref) {
  if (errors.length === 0) return null;
  const jump = (id: string) => {
    const el = document.getElementById(id);
    const target = el?.matches('input,select,textarea,button') ? el : el?.querySelector<HTMLElement>('input,select,textarea');
    target?.focus();
    target?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="mb-6 rounded-xl border border-destructive/40 bg-primary-soft p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <p className="flex items-center gap-2 font-semibold text-destructive"><AlertTriangle className="h-4 w-4" aria-hidden />Please fix {errors.length === 1 ? '1 problem' : `${errors.length} problems`} before continuing</p>
      <ul className="mt-2 list-disc space-y-1 pl-9 text-sm">
        {errors.map(e => (
          <li key={e.field}>
            <a href={`#${e.id}`} onClick={ev => { ev.preventDefault(); jump(e.id); }} className="font-medium text-destructive underline underline-offset-2 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{e.label}</a>
            <span className="text-foreground">: {e.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span><strong className="font-semibold text-foreground">Demo only.</strong> {children ?? 'Nothing you enter is sent, saved or shared. It stays in this browser tab and is cleared when you leave.'}</span>
    </p>
  );
}

export function FormPage({ crumb, eyebrow, icon, title, intro, children }: { crumb: string; eyebrow: string; icon: ReactNode; title: string; intro: string; children: ReactNode }) {
  return (
    <div className="bg-surface">
      <section className="border-b bg-background">
        <div className="container-page py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Home</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">{icon}{eyebrow}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p>
        </div>
      </section>
      <div className="container-page py-8 md:py-12">{children}</div>
    </div>
  );
}

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol aria-label="Progress" className="mb-6 flex items-center gap-3 text-sm">
      {steps.map((s, i) => (
        <li key={s} aria-current={i === current ? 'step' : undefined} className={cn('flex items-center gap-2', i === current ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
          <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold', i < current ? 'bg-success text-primary-foreground' : i === current ? 'bg-primary text-primary-foreground' : 'bg-muted')}>{i + 1}</span>
          {s}
          {i < steps.length - 1 && <span aria-hidden className="mx-1 hidden h-px w-8 bg-border sm:block" />}
        </li>
      ))}
    </ol>
  );
}

export const cardClass = 'rounded-2xl border bg-card p-5 shadow-card sm:p-8';

export function SummaryList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y rounded-xl border bg-background">
      {items.map(i => (
        <div key={i.label} className="grid gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-muted-foreground">{i.label}</dt>
          <dd className="min-w-0 break-words text-sm font-semibold text-foreground sm:col-span-2">{i.value || '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
