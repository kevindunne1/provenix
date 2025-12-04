import * as React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface VerificationResultProps {
  valid: boolean
  hashMatch: boolean
  signatureValid: boolean
  originalText?: string
  className?: string
}

const VerificationResult: React.FC<VerificationResultProps> = ({
  valid,
  hashMatch,
  signatureValid,
  originalText,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-input border-2 p-6',
        valid
          ? 'border-success bg-green-50'
          : 'border-error bg-red-50',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        {valid ? (
          <>
            <CheckCircle2 className="h-6 w-6 text-success" />
            <h3 className="text-h3 text-green-900">Signature is Valid</h3>
          </>
        ) : (
          <>
            <XCircle className="h-6 w-6 text-error" />
            <h3 className="text-h3 text-red-900">Verification Failed</h3>
          </>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          {hashMatch ? (
            <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-error mt-0.5" />
          )}
          <div>
            <p className="text-body font-medium text-neutral-900">Hash Match</p>
            <p className="text-body-sm text-neutral-700">
              {hashMatch ? 'Content has not been modified' : 'Content was modified'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          {signatureValid ? (
            <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-error mt-0.5" />
          )}
          <div>
            <p className="text-body font-medium text-neutral-900">Signature Valid</p>
            <p className="text-body-sm text-neutral-700">
              {signatureValid ? 'Cryptographic signature is valid' : 'Manifest was tampered with'}
            </p>
          </div>
        </div>

        {originalText && (
          <div className="mt-6 pt-6 border-t border-neutral-300">
            <p className="text-body font-medium text-neutral-900 mb-3">Original Text:</p>
            <div className="rounded-input bg-white border border-neutral-300 p-4">
              <p className="text-body text-neutral-900 whitespace-pre-wrap font-mono">
                {originalText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { VerificationResult }
