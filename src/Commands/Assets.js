'use strict'

const { Command } = require('@adonisjs/ace')
const webpackRunner = require('../Services/webpack-runner')

class Assets extends Command {
  static get signature() {
    return `
      assets
      { --prod : Build assets for production }
      { --watch : Watch files to rebuild them on change }
      { --hot : Watch files with hot reloading enabled }
    `
  }

  static get description() {
    return 'Build assets using Webpack'
  }

  async handle(_, { prod, watch, hot }) {
    await webpackRunner(use('Helpers').appRoot(), { prod, watch, hot })
  }
}

module.exports = Assets
