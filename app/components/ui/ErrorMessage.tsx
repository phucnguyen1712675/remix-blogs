import { cn } from '~/utils/cn'

interface ErrorMessageProps {
  message?: string
  className?: string
  id?: string
}

export const ErrorMessage = ({ 
  message, 
  className,
  id 
}: ErrorMessageProps) => {
  if (!message) return null

  return (
    <div 
      id={id}
      role="alert"
      aria-live="polite"
      className={cn(
        "text-sm font-medium text-red-500 dark:text-red-400 mt-1",
        className
      )}
    >
      {message}
    </div>
  )
} 