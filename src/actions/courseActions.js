'use strict'
import courseApi from '../api/mockCourseApi'
import * as types from './actionTypes'
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'

export function loadCoursesSuccess (courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }
}

export function createCourseSuccess (course) {
  return { type: types.CREATE_COURSES_SUCCESS, course }
}

export function updateCourseSuccess (course) {
  return { type: types.UPDATE_COURSES_SUCCESS, course }
}

// Thunk
export function loadCourses () {
  return function (dispatch) {
    dispatch(beginAjaxCall()) // do in mock api
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses))
    }).catch(error => {
      throw (error)
    })
  }
}

export function saveCourse (course) {
  return function (dispatch) {
    dispatch(beginAjaxCall()) // do in mock api
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse))
    }).catch(error => {
      dispatch(ajaxCallError(error))
      throw (error)
    })
  }
}
