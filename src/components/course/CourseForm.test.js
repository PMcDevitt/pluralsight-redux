'use strict'
import React from 'react'
import expect from 'expect'
import CourseForm from './CourseForm'
import { mount, shallow } from 'enzyme'

function setup(saving) {
  let props = {
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  }
  return shallow(<CourseForm {...props} />)
}

describe('Enzyme: Given the CourseForm component', () => {
  describe('When it renders', () => {
    it('Then will have a form and h1', () => {
      const wrapper = setup(false)
      expect(wrapper.find('form').length).toBe(1)
      expect(wrapper.find('h1').text()).toEqual('Manage Course')
    })
    it('Then save button is labeled "Save" when not saving', () => {
      const wrapper = setup(false)
      expect(wrapper.find('input').props().value).toBe('Save')
    })
    it('Then save button is labeled "Saving..." when saving', () => {
      const wrapper = setup(true)
      expect(wrapper.find('input').props().value).toBe('Saving...')
    })
  })
})

