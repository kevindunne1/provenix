/**
 * Custom element type declarations
 */

declare namespace JSX {
  interface IntrinsicElements {
    'provenix-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        manifest?: string
        'manifest-id'?: string
      },
      HTMLElement
    >
  }
}
