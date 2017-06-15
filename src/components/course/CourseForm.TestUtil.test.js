'use strict'
import React from 'react'
import expect from 'expect'
import CourseForm from './CourseForm'

import TestUtils from 'react-addons-test-utils'

function setup (saving) {
  let props = {
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  }
  let renderer = TestUtils.createRenderer()
  renderer.render(<CourseForm {...props} />)
  let output = renderer.getRenderOutput()
  return {
    props,
    output,
    renderer
  }
}

describe('Test Utils: Given the CourseForm component ', () => {
  describe('When it renders ', () => {
    it('Then a form and h1 are present.', () => {
      const { output } = setup()
      expect(output.type).toBe('form')
      let [h1] = output.props.children
      expect(h1.type).toBe('h1')
    })
    it('Save button is labeled "Save" when saving', () => {
      const {output} = setup(false)
      const submitButton = output.props.children[5]
      expect(submitButton.props.value).toBe('Save')
    })
    it('Save button is labeled "Saving..." when not saving', () => {
      const {output} = setup(true)
      const submitButton = output.props.children[5]
      expect(submitButton.props.value).toBe('Saving...')
    })
  })
})
