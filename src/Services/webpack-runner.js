'use strict'

const { join } = require('path')
const webpack = require('webpack')

module.exports = async (appRoot, { production, watch }) => {
  process.env.NODE_ENV =
    process.env.NODE_ENV || (production ? 'production' : 'development')
  const webpackConfig = require(join(
    appRoot,
    'node_modules/laravel-mix/setup/webpack.config.js'
  ))
  const compiler = webpack(webpackConfig)
  try {
    const stats = await (watch ? getWatchPromise : getRunPromise)(
      compiler,
      webpackConfig
    )
    console.log(stats.toString(webpackConfig.stats))
  } catch (error) {
    console.error(error)
  }
}

function getRunPromise(compiler) {
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) reject(error)
      resolve(stats)
    })
  })
}

function getWatchPromise(compiler, config) {
  return new Promise((resolve, reject) => {
    compiler.watch(config.watchOptions || {}, (error, stats) => {
      if (error) reject(error)
      resolve(stats)
    })
  })
}
