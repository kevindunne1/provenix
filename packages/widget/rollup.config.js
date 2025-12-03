import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/provenix-widget.js',
    format: 'iife',
    name: 'ProvenixWidget',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    terser(),
  ],
}
