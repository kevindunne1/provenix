import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import widget for custom element registration
import '@provenix/widget'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
