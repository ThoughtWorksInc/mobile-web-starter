import 'shared/polyfills/polyfill'

import deviceClassHelper from 'shared/polyfills/deviceClassHelper';
import application from './application'

deviceClassHelper(document.body);
application(document.getElementById('root'));