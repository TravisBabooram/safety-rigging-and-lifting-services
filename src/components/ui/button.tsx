import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const SHIMMER =
  "relative overflow-hidden isolate after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-700"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-spring hover:scale-[1.04] hover:brightness-110 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `bg-brand-orange text-white hover:bg-brand-orange-dark shadow-card hover:shadow-industrial ${SHIMMER}`,
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background dark:border-brand-orange dark:text-brand-orange dark:hover:bg-brand-orange dark:hover:text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent/10 hover:text-brand-orange",
        link: "text-brand-orange underline-offset-4 hover:underline",
        cta: `bg-brand-orange text-white hover:bg-brand-orange-dark shadow-cta hover:shadow-cta font-semibold ${SHIMMER}`,
        hero: "bg-gradient-primary text-white hover:shadow-industrial font-semibold border border-brand-orange/20",
        industrial: "bg-gradient-card border border-border text-foreground hover:shadow-card hover:border-primary/30",
        "light-cta": "bg-white text-black hover:bg-white/90 shadow-card font-semibold border border-white/20",
        "dark-cta": "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
