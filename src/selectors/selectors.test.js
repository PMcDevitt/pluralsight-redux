'use strict'
import React from 'react'
import expect from 'expect'
import {mount, shallow} from 'enzyme'
import {authorsFormattedForDropdown} from './selectors'

describe('Given the  component ', () => {
  describe('When it renders ', () => {
    it('Then fromatted author data should be returned for the dropdown', () => {
      const authors = [
        {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
        {id: 'scott-allen', firstName: 'Scott', lastName: 'Allen'}
      ]

      const expected = [
        {value: 'cory-house', text: 'Cory House'},
        {value: 'scott-allen', text: 'Scott Allen'}
      ]

      expect(authorsFormattedForDropdown(authors)).toEqual(expected)
    })
  })
})
