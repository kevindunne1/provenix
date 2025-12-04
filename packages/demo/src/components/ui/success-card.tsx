import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SuccessCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

const SuccessCard = React.forwardRef<HTMLDivElement, SuccessCardProps>(
  ({ title, description, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-input border-2 border-success bg-green-50 p-4',
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-body font-semibold text-green-900 mb-1">
              {title}
            </h4>
            {description && (
              <p className="text-body-sm text-green-800 mb-3">
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
SuccessCard.displayName = 'SuccessCard'

export { SuccessCard }
