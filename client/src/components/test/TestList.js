import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

import TestTable from './TestTable'
import TestToolbar from './TestToolbar'
import mockData from './data'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const TestList = () => {
  const classes = useStyles()

  const [users] = useState(mockData)

  return (
    <div className={classes.root}>
      <TestToolbar />
      <div className={classes.content}>
        <TestTable users={users} />
      </div>
    </div>
  )
}

export default TestList
