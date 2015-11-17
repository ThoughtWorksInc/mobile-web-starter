const _ = require('lodash');

function deviceClassHelper(elem) {
  const deviceInfo = navigator.userAgent.match(/(iPhone OS) ([^\s;]+)/i) ||
    navigator.userAgent.match(/(Android) ([^\s;]+)/i);

  if (deviceInfo) {
    const deviceOs = _.kebabCase(String(deviceInfo[1]).toLowerCase());
    const deviceOsVersion = 'v' + String(deviceInfo[2]).split(/[_\.]/).join('-');

    elem.classList.add(deviceOs);
    elem.classList.add([deviceOs, deviceOsVersion].join('--'));
  }
}

module.exports = deviceClassHelper;