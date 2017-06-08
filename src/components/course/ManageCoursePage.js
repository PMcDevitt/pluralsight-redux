'use strict'
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'
import CourseForm from './CourseForm'
import toastr from 'toastr'

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    }
    this.updateCourseState = this.updateCourseState.bind(this)
    this.saveCourse = this.saveCourse.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      })
    }
  }

  updateCourseState(e) {
    const field = e.target.name
    let course = this.state.course
    course[field] = e.target.value
    return this.setState({course: course})
  }

  saveCourse(event) {
    event.preventDefault()
    this.setState({saving:true})
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error)
        this.setState({saving:false})
      })
  }

  redirect(){
    this.setState({saving:false})
    toastr.success('Course saved')
    this.context.router.push('/courses')
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    )
  }
}

ManageCoursePage.propTypes = {
  course: React.PropTypes.object.isRequired,
  authors: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
}

ManageCoursePage.contextTypes = {
  router: React.PropTypes.object
}

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id)
  return course ? course[0] : null
}

function mapStateToProps(state, ownProps) {
  let courseId = ownProps.params.id
  let course = {id: '', watchHref: '', title: '', authorID: '', length: '', category: ''}

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId)
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    }
  })

  return {
    course: course,
    authors: authorsFormattedForDropdown
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
