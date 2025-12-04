import * as React from 'react'
import { ChevronDown, ChevronRight, Copy, Check, Shield } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from './badge'
import { Button } from './button'
import type { SignResponse } from '@provenix/shared'

interface ManifestViewerProps {
  manifest: SignResponse
  className?: string
}

const ManifestViewer: React.FC<ManifestViewerProps> = ({ manifest, className }) => {
  const [expanded, setExpanded] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(manifest, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('rounded-input border border-neutral-300 bg-neutral-100 overflow-hidden', className)}>
      <div className="p-4 bg-white border-b border-neutral-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="success">
              <Shield className="h-3 w-3 mr-1" />
              Signed
            </Badge>
            <span className="text-body-sm text-neutral-700">
              {manifest.manifest.timestamp}
            </span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-3"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <span className="text-body-sm font-medium text-neutral-900">Hash:</span>
          <code className="ml-2 text-code font-mono text-neutral-700 bg-white px-2 py-1 rounded">
            {manifest.hash.substring(0, 16)}...
          </code>
        </div>
        <div>
          <span className="text-body-sm font-medium text-neutral-900">Signature:</span>
          <code className="ml-2 text-code font-mono text-neutral-700 bg-white px-2 py-1 rounded">
            {manifest.signature.substring(0, 16)}...
          </code>
        </div>
        <div>
          <span className="text-body-sm font-medium text-neutral-900">Algorithm:</span>
          <code className="ml-2 text-code font-mono text-neutral-700 bg-white px-2 py-1 rounded">
            {manifest.manifest.algorithm}
          </code>
        </div>
      </div>

      <div className="border-t border-neutral-300">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-4 py-3 flex items-center justify-between text-body-sm font-medium text-primary hover:bg-primary-light transition-colors"
        >
          <span>View Full Manifest</span>
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {expanded && (
          <div className="p-4 bg-slate-900">
            <pre className="overflow-x-auto">
              <code className="font-mono text-code text-neutral-100 whitespace-pre">
                {JSON.stringify(manifest, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export { ManifestViewer }
