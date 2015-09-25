if (!global.Promise) {
  global.Promise = require('es6-Promise').Promise
}

if (!global.Object.assign) {
  global.Object.assign = require('object-assign')
}

if (!global.fetch) {
  global.fetch = require('whatwg-fetch')
}