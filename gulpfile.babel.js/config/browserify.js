import gulp from 'gulp'
import path from 'path'
import _ from 'lodash'
import babelify from 'babelify'
import envify from 'envify/custom'
import config from 'config'

const vendorBrowser = require(path.join(process.cwd(), gulp.config('root.src'), 'package.json')).browser
const jsDestFolder = `${gulp.config('root.dist')}/assets/js`
const basedir = path.join(process.cwd(), gulp.config('root.src'))

export default {
  files: [
    {
      'dest': jsDestFolder,
      'options': {
        'basename': 'vendor',
        'basedir': basedir,
        'debug': true,
        'require': _.map(_.keys(vendorBrowser), (key) => {
          return [
            vendorBrowser[key], {
              expose: key
            }
          ]
        })
      }
    },
    {
      'entry': `${gulp.config('root.src')}/index.js`,
      'dest': jsDestFolder,
      'options': {
        'debug': true,
        'external': _.keys(vendorBrowser)
      }
    }
  ],
  options: {
    extensions: ['.jsx', '.js'],
    plugin: (process.env.NODE_ENV === 'production') ? require('bundle-collapser/plugin') : null,
    transform: [
      babelify,
      envify(Object.assign({}, config.default, {
        NODE_ENV: process.env.NODE_ENV
      }))
    ]
  }
}