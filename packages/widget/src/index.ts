/**
 * Provenix Verification Widget
 * Embeddable Web Component for displaying cryptographic provenance
 *
 * Usage:
 * <script src="https://cdn.provenix.dev/widget.js"></script>
 * <provenix-widget manifest='{"hash":"...","timestamp":"...","signature":"..."}'></provenix-widget>
 *
 * Or with manifest ID:
 * <provenix-widget manifest-id="m_01HZX8F92VY5X..."></provenix-widget>
 */

interface Manifest {
  content: string
  hash: string
  timestamp: string
  metadata?: Record<string, unknown>
  version: string
}

interface SignResponse {
  manifest: Manifest
  signature: string
}

class ProvenixWidget extends HTMLElement {
  private manifest: SignResponse | null = null
  private expanded: boolean = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['manifest', 'manifest-id']
  }

  connectedCallback() {
    this.parseManifest()
    this.render()
  }

  attributeChangedCallback() {
    this.parseManifest()
    this.render()
  }

  parseManifest() {
    const manifestAttr = this.getAttribute('manifest')
    if (manifestAttr) {
      try {
        this.manifest = JSON.parse(manifestAttr) as SignResponse
      } catch (e) {
        console.error('Provenix Widget: Invalid manifest JSON', e)
        this.manifest = null
      }
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded
    this.render()
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  render() {
    if (!this.shadowRoot) return

    if (!this.manifest) {
      this.shadowRoot.innerHTML = this.renderError()
      return
    }

    this.shadowRoot.innerHTML = `
      ${this.renderStyles()}
      <div class="widget">
        <div class="header">
          <div class="badge">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="badge-text">Provenix Verified</span>
          </div>
          <button class="toggle" onclick="this.getRootNode().host.toggleExpanded()">
            <svg class="chevron ${this.expanded ? 'expanded' : ''}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        ${this.expanded ? this.renderDetails() : ''}
      </div>
    `
  }

  renderStyles(): string {
    return `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }

        .widget {
          border: 1px solid #E2E4FF;
          border-radius: 10px;
          background: #FAFAFF;
          overflow: hidden;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: linear-gradient(135deg, #F8F9FF 0%, #FAFAFF 100%);
        }

        .badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #5C6BFF;
          flex-shrink: 0;
        }

        .badge-text {
          font-weight: 600;
          color: #1E293B;
          font-size: 14px;
        }

        .toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .toggle:hover {
          background: rgba(92, 107, 255, 0.1);
        }

        .chevron {
          width: 16px;
          height: 16px;
          color: #64748B;
          transition: transform 0.2s;
        }

        .chevron.expanded {
          transform: rotate(180deg);
        }

        .details {
          padding: 16px;
          border-top: 1px solid #E2E4FF;
          background: #FFFFFF;
        }

        .detail-row {
          margin-bottom: 12px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          font-size: 12px;
          font-weight: 500;
          color: #64748B;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 13px;
          color: #1E293B;
          word-break: break-all;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }

        .timestamp-value {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .metadata {
          font-size: 12px;
          color: #475569;
          padding: 8px;
          background: #F8FAFC;
          border-radius: 6px;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }

        .error {
          padding: 16px;
          color: #DC2626;
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          border-radius: 10px;
          font-size: 14px;
        }

        .footer {
          padding: 12px 16px;
          text-align: center;
          font-size: 11px;
          color: #94A3B8;
          border-top: 1px solid #E2E4FF;
        }

        .footer a {
          color: #5C6BFF;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    `
  }

  renderDetails(): string {
    if (!this.manifest) return ''

    const { manifest, signature } = this.manifest
    const metadataStr = manifest.metadata
      ? JSON.stringify(manifest.metadata, null, 2)
      : 'None'

    return `
      <div class="details">
        <div class="detail-row">
          <div class="detail-label">Timestamp</div>
          <div class="detail-value timestamp-value">${this.formatTimestamp(manifest.timestamp)}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Content Hash (SHA-256)</div>
          <div class="detail-value">${manifest.hash}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Cryptographic Signature (Ed25519)</div>
          <div class="detail-value">${signature}</div>
        </div>
        ${manifest.metadata ? `
          <div class="detail-row">
            <div class="detail-label">Metadata</div>
            <pre class="metadata">${metadataStr}</pre>
          </div>
        ` : ''}
      </div>
      <div class="footer">
        Powered by <a href="https://provenix.dev" target="_blank" rel="noopener">Provenix</a> — Cryptographic Provenance
      </div>
    `
  }

  renderError(): string {
    return `
      ${this.renderStyles()}
      <div class="error">
        ⚠️ Unable to load verification manifest. Please provide a valid 'manifest' attribute.
      </div>
    `
  }
}

// Register custom element
customElements.define('provenix-widget', ProvenixWidget)

export { ProvenixWidget }
