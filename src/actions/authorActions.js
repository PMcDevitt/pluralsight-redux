'use strict'
import courseApi from '../api/mockAuthorApi'
import * as types from './actionTypes'
import {beginAjaxCall} from './ajaxStatusActions'

export function loadAuthorsSuccess(authors){
  return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

// Thunk
export function  loadAuthors() {
  return function(dispatch) {
    dispatch(beginAjaxCall()) // do in mock api
    return courseApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors))
    }).catch(error => {
      throw(error)
    })
  }

}
