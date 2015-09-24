exports.config = {
  specs: [
    './e2e/*.test.js'
  ],
  exclude: [],
  capabilities: [{
    browserName: 'chrome'
  }],
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 10000,
  framework: 'mocha',
  reporter: 'spec',
  mochaOpts: {
    ui: 'bdd',
    compilers: ['.:babel/register']
  },
  before() {
    const chai = require('chai');
    chai.Should();
  },
  after() {
    browser.end()
  }
};