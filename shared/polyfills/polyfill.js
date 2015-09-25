if (!global.Promise) {
  global.Promise = require('es6-promise').Promise
}

if (!global.Object.assign) {
  global.Object.assign = require('object-assign')
}

if (!global.fetch) {
  require('whatwg-fetch')
}