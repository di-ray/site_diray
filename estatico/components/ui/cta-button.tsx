import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "outline" | "white"
  size?: "sm" | "md" | "lg"
  className?: string
  showArrow?: boolean
}

const CTAButton = ({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
}: CTAButtonProps) => {
  const baseStyles =
    "cta-button inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary shadow-lg hover:shadow-xl",
    accent: "bg-accent text-dark hover:bg-accent/90 focus:ring-accent shadow-lg hover:shadow-xl",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    white: "bg-white text-dark border-2 border-white hover:bg-transparent hover:text-white focus:ring-white",
  }

  const sizeStyles = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  }

  return (
    <Link href={href} className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      <span className="relative z-10 flex items-center">
        {children}
        {showArrow && (
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </Link>
  )
}

export default CTAButton
