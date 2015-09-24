import { expect } from 'chai';

import React from 'react/addons'
import Icon from '../Icon';

const TestUtils = React.addons.TestUtils

describe(__filename, ()=> {

  context('when render with prop type', ()=> {
    it('should have className with "fa fa-<type>"', ()=> {
      const type = 'alt';
      const instance = TestUtils.renderIntoDocument(<Icon type={type}/>)
      const instanceNodeClassName = React.findDOMNode(instance).className;

      expect(instanceNodeClassName).to.contains('icon');
      expect(instanceNodeClassName).to.contains(`icon--${type}`);
    })
  })

})