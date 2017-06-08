'use strict'
import {combineReducers} from 'redux'
import authors from './authorReducer'
import courses from './courseReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'

const rootReducer = combineReducers({
  courses, // = courses : courses
  authors,
  ajaxCallsInProgress
})

export default rootReducer
