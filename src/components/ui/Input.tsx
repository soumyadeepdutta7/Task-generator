import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
                <input
                    className={cn(
                        "flex h-10 w-full rounded-md border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                        error && "border-red-500 focus:ring-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
