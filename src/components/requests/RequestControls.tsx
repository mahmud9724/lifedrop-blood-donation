import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { buttonStyles, type ButtonStyleProps } from '@/components/site/ui';

export function RequestButton({ variant = 'primary', size = 'md', className, ...props }: Omit<ButtonProps, 'variant' | 'size'> & ButtonStyleProps) {
  return <Button {...props} className={buttonStyles({ variant, size, className })} />;
}
export function RequestSelect({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold">
    {label}
    <select value={value} onChange={e => onChange(e.target.value)} className="h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm font-normal text-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{children}</select>
  </label>;
}
