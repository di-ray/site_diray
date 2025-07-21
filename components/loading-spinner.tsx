export interface LoadingSpinnerProps {
  size?: number
  className?: string
  color?: string
}

export default function LoadingSpinner({ 
  size = 24, 
  className = "",
  color = "text-primary"
}: LoadingSpinnerProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin ${color}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export function LoadingScreen({ message = "Carregando..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-dark/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size={48} color="text-primary" className="mb-4" />
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  )
}

export function LoadingButton({ 
  children, 
  isLoading, 
  loadingText = "Carregando...",
  ...props 
}: any) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner size={16} />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}