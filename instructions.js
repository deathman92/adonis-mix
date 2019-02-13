'use strict'

const { join } = require('path')

module.exports = async cli => {
  try {
    const mixConfigPath = join(cli.helpers.appRoot(), 'webpack.mix.js')
    if (await cli.command.pathExists(mixConfigPath)) return
    await cli.copy(
      join(
        cli.helpers.appRoot(),
        'node_modules/laravel-mix/setup/webpack.mix.js'
      ),
      mixConfigPath
    )
    cli.command.completed('create', 'webpack.mix.js')
  } catch (error) {
    console.log(error)
  }
}
