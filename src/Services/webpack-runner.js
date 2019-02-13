'use strict'

const { join } = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = async (appRoot, { production, watch, hot }) => {
  const webpackConfig = {
    ...require(join(
      appRoot,
      'node_modules/laravel-mix/setup/webpack.config.js'
    )),
    mode: production ? 'production' : 'development',
    watch: !!watch
  }
  const compiler = webpack(webpackConfig)
  const statsConfig = {
    colors: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    moduleTrace: false,
    entrypoints: false
  }
  try {
    if (!hot) {
      const stats = await (watch ? getWatchPromise : getRunPromise)(compiler)
      console.log(stats.toString(statsConfig))
    } else {
      const devServer = new WebpackDevServer(compiler, {
        ...webpackConfig.devServer,
        noInfo: false,
        quiet: false,
        hot: true,
        inline: true,
        stats: statsConfig
      })
      devServer.listen(
        webpackConfig.devServer.port,
        webpackConfig.devServer.host
      )
    }
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

function getWatchPromise(compiler) {
  return new Promise((resolve, reject) => {
    compiler.watch({}, (error, stats) => {
      if (error) reject(error)
      resolve(stats)
    })
  })
}
