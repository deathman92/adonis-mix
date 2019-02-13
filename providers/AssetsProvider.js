'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class AssetsProvider extends ServiceProvider {
  /**
   * Register method called by the Ioc container
   * to register the provider
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.bind('Adonis/Commands/Assets', app =>
      require('../src/Commands/Assets')
    )
  }

  /**
   * Boot method called by the Ioc container to
   * boot the provider
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const ace = require('@adonisjs/ace')
    ace.addCommand('Adonis/Commands/Assets')

    const View = this.app.use('Adonis/Src/View')
    const Helpers = this.app.use('Adonis/Src/Helpers')
    require('../src/View/mix')(View, Helpers)
  }
}

module.exports = AssetsProvider
