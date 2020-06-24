import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TestTable from './TestTable'
import TestToolbar from './TestToolbar'
import Alert from '../layout/Alert'
import { getTests } from '../../actions/test'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const TestList = ({ getTests, tests }) => {
  const classes = useStyles()

  useEffect(() => {
    getTests()
  }, [getTests])

  return (
    <div className={classes.root}>
      <Alert />
      <TestToolbar />
      <div className={classes.content}>
        <TestTable tests={tests} />
      </div>
    </div>
  )
}

TestList.propTypes = {
  getTests: PropTypes.func.isRequired,
  tests: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  tests: state.test.tests
})

export default connect(mapStateToProps, { getTests })(TestList)
