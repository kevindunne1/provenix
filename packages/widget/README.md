# @provenix/widget

Embeddable verification widget for Provenix manifests.

## Usage

```html
<!-- Include the widget script -->
<script src="https://cdn.provenix.dev/widget.js"></script>

<!-- Add verification badge -->
<provenix-widget
  manifest='{"hash":"...","timestamp":"..."}'
  signature="...">
</provenix-widget>
```

## Development

```bash
# Build widget
pnpm --filter=widget build

# Watch mode
pnpm --filter=widget dev
```

## Implementation Status

⚠️ **Under Construction** - Widget awaits API implementation and discovery validation.

## License

MIT
