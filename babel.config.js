module.exports = function (api) {
  const presets = ['@babel/typescript']

  // Resolve ES2015+ only before publishing to NPM
  if (process.env['NODE_ENV'] === 'production') {
    presets.push('@babel/preset-env')
  }

  const plugins = []

  api.cache(false)

  return {
    presets,
    plugins,
  }
}
