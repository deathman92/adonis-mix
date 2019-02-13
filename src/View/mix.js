'use strict'

const fs = require('fs')

module.exports = (View, Helpers) => {
  View.global('mix', file => {
    if (!file) return

    if (!file.startsWith('/')) {
      file = '/' + file
    }

    if (fs.existsSync(Helpers.publicPath('hot'))) {
      const url = fs.readFileSync(Helpers.publicPath('hot'), 'utf8')

      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url.substring(url.indexOf(':') + 1, url.lastIndexOf('/')) + file
      }

      return '//localhost:8080' + file
    }

    const manifest = require(Helpers.publicPath('mix-manifest.json'))
    return manifest[file]
  })
}
