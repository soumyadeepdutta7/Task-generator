import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils'; // We need to create lib/utils for clsx/tailwind-merge

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50';

        const variants = {
            primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20',
            secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
            ghost: 'hover:bg-slate-800 text-slate-300 hover:text-white',
            outline: 'border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white bg-transparent'
        };

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 py-2',
            lg: 'h-12 px-8 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
