'use strict'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Router, Route } from 'react-router'
import sinon from 'sinon'

import Root, { NotFound } from '../../../react_components/hardware_requests/Root.jsx'
import SvdCheck from '../../../react_components/hardware_requests/SvdCheck.jsx'
import OrderSummary from '../../../react_components/hardware_requests/OrderSummary.jsx'
import UserDetails from '../../../react_components/hardware_requests/UserDetails.jsx'
import SubmittedOrder from '../../../react_components/hardware_requests/SubmittedOrder.jsx'
import MainContainer from '../../../react_components/app_components/MainContainer.jsx'

describe('Given the Root component', () => {
  describe('When the render is called', () => {
    it('The paths map to the correct components', sinon.test(() => {
      const initializeSpy = sinon.spy();
      const ReactGA = {initialize: initializeSpy}
      const div = document.createElement('div')
      let wrapper = shallow(<Root analytics={ReactGA} />, div)

      const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props()
        pathMap[routeProps.path] = routeProps.component
        return pathMap
      }, {})

      expect(initializeSpy.calledOnce).to.be.true
      expect(pathMap['hardwarerequest']).to.equal(MainContainer)
      expect(pathMap['ordersummary/:ntid']).to.equal(OrderSummary)
      expect(pathMap['svdcheck/:ntid']).to.equal(SvdCheck)
      expect(pathMap['userdetails/:ntid']).to.equal(UserDetails)
      expect(pathMap['submitted']).to.equal(SubmittedOrder)
      expect(pathMap['*']).to.equal(NotFound)
    }))
  })

  describe('When router updates', () => {
    it('it calls set and pageview on the analytics', sinon.test(() => {
      const setMock = sinon.spy()
      const pageviewMock = sinon.spy()

      const ReactGA = {initialize: ()=>{}, set: setMock, pageview: pageviewMock}
      const div = document.createElement('div')
      let wrapper = shallow(<Root analytics={ReactGA} />, div)

      const Router = wrapper.find('Router')
      Router.simulate('update')

      expect(setMock.calledOnce).to.be.true
      expect(pageviewMock.calledOnce).to.be.true
    }))
  })
})
