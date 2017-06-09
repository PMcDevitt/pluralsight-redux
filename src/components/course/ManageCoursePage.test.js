'use strict'
import React from 'react'
import expect from 'expect'
import {mount, shallow} from 'enzyme'
import {ManageCoursePage} from './ManageCoursePage'

let props = {
  course: {id: '', watchHref: '', title: '', authorID: '', length: '', category: ''},
  authors: [],
  actions: {saveCourse: () =>{return Promise.resolve()} }
}

describe('Given the ManageCoursePage component ', () => {
  describe('When it renders ', () => {
    it('Then it sets an error message when trying to save with an empty title', () => {
      const wrapper = mount(<ManageCoursePage {...props} />)
      const saveButton = wrapper.find('input').last()
      expect(saveButton.prop('type')).toBe('submit')
      saveButton.simulate('click')
      expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.')
    })
  })
})
