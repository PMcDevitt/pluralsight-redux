'use strict'
import courseApi from '../api/mockCourseApi'
import * as types from './actionTypes'

export function loadCoursesSuccess(courses){
  return { type: types.LOAD_COURSES_SUCCESS, courses }
}

// Thunk
export function  loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses))
    }).catch(error => {
      throw(error)
    })
  }
}
