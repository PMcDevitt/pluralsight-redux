'use strict'
import {combineReducers} from 'redux'
import authors from './authorReducer'
import courses from './courseReducer'

const rootReducer = combineReducers({
  courses, // = courses : courses
  authors
})

export default rootReducer
