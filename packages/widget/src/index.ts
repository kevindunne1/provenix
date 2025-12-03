/**
 * Provenix Verification Widget
 * Embeddable Web Component for displaying verification status
 *
 * Usage:
 * <script src="https://cdn.provenix.dev/widget.js"></script>
 * <provenix-widget manifest='{"hash":"..."}' signature="..."></provenix-widget>
 */

class ProvenixWidget extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .widget {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          background: white;
        }
        .status {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon {
          font-size: 24px;
        }
        .verified {
          color: #10b981;
        }
        .pending {
          color: #f59e0b;
        }
      </style>
      <div class="widget">
        <div class="status pending">
          <span class="icon">⏳</span>
          <span>Provenix verification widget (implementation pending)</span>
        </div>
      </div>
    `
  }
}

// Register custom element
customElements.define('provenix-widget', ProvenixWidget)

export { ProvenixWidget }
