'use strict'
import React from 'react'
import {Link, IndexLink} from 'react-router'
import LoadingDots from './LoadingDots'

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to='/' activeClassName='active>'>Home</IndexLink>
      {' | '}
      <Link to='/courses' activeClassName='active'>Courses</Link>
      {' | '}
      <Link to='/about' activeClassName='active'>About</Link>
      {loading && <LoadingDots interval={200} dots={20} />}
    </nav>
  )
}

Header.propTypes = {
  loading: React.PropTypes.bool.isRequired
}

export default Header
