import * as React from 'react'
import { XCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ErrorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

const ErrorCard = React.forwardRef<HTMLDivElement, ErrorCardProps>(
  ({ title, description, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-input border-2 border-error bg-red-50 p-4',
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <XCircle className="h-5 w-5 text-error mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-body font-semibold text-red-900 mb-1">
              {title}
            </h4>
            {description && (
              <p className="text-body-sm text-red-800 mb-3">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    )
  }
)
ErrorCard.displayName = 'ErrorCard'

export { ErrorCard }
