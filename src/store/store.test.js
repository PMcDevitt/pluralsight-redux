'use strict'

import expect from 'expect'
import {createStore} from 'redux'
import rootReducer from '../reducers'
import initialState from '../reducers/initialState'
import * as courseActions from '../actions/courseActions'

describe('Store', () => {
  it('Should handle creating courses', () => {
    const store = createStore(rootReducer, initialState)
    const course = {
      title: 'Clean Code'
    }
    const course2 = {
      title: 'Clean Coder'
    }

    const action = courseActions.createCourseSuccess(course)
    store.dispatch(action)

    const actual = store.getState().courses[0]
    const expected = {
      title: 'Clean Code'
    }

    expect(actual).toEqual(expected)

    const secondAction = courseActions.createCourseSuccess(course2)
    store.dispatch(secondAction)
    
    const actual2 = store.getState().courses[1]
    
    expect(actual2).toEqual(course2)
  })
})
