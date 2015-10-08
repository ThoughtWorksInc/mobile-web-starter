import { expect } from 'chai';

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import Icon from '../Icon';

describe(__filename, ()=> {

  context('when render with prop type', ()=> {
    it('should have className with "fa fa-<type>"', ()=> {
      const type = 'alt';
      const instance = TestUtils.renderIntoDocument(<Icon type={type}/>)
      const instanceNodeClassName = ReactDOM.findDOMNode(instance).className;

      expect(instanceNodeClassName).to.contains('icon');
      expect(instanceNodeClassName).to.contains(`icon--${type}`);
    })
  })

})
