'use strict'

const { Command } = require('@adonisjs/ace')
const webpackRunner = require('../Services/webpack-runner')

class Assets extends Command {
  static get signature() {
    return `
      assets
      { --production : Build assets for production }
      { --watch : Watch files to rebuild them on change }
    `
  }

  static get description() {
    return 'Build assets using Webpack'
  }

  async handle(_, { production, watch }) {
    await webpackRunner(use('Helpers').appRoot(), { production, watch })
  }
}

module.exports = Assets
