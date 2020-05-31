import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProblemTable from './ProblemTable'
import ProblemToolbar from './ProblemToolbar'
import mockData from './data'
import { getProblems } from '../../actions/problem'
import Alert from '../layout/Alert'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const ProblemList = ({ getProblems, problems }) => {
  const classes = useStyles()

  useEffect(() => {
    getProblems()
  }, [getProblems])
  return (
    <div className={classes.root}>
      <Alert />
      <ProblemToolbar />
      <div className={classes.content}>
        <ProblemTable problems={problems} />
      </div>
    </div>
  )
}

ProblemList.propTypes = {
  getProblems: PropTypes.func.isRequired,
  problems: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  problems: state.problem.problems
})

export default connect(mapStateToProps, { getProblems })(ProblemList)
