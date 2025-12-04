import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './button'

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, language = 'json', className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        ref={ref}
        className={cn('relative rounded-input bg-slate-900 p-4', className)}
        {...props}
      >
        <div className="absolute top-3 right-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={copyToClipboard}
            className="bg-slate-800 hover:bg-slate-700 text-white border-0 h-8 px-3"
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
        <pre className="overflow-x-auto pr-24">
          <code className="font-mono text-code text-neutral-100 whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
