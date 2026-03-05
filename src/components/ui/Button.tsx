"use client";

import { cn } from "@/lib/utils";

export function Button({
    children,
    className,
    variant = "primary",
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                variant === "primary" ? "btn-luxury" : "btn-outline",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
