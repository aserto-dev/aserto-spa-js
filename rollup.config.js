import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'


const extensions = ['.ts', '.tsx']

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
  },

  plugins: [
    resolve({ extensions }),
    babel({
      babelHelpers: 'runtime',
      extensions,
      plugins: [
        "@babel/plugin-transform-runtime"
      ]
    }),
    commonjs({ include: 'node_modules/**' }),
  ],
}

export default config
