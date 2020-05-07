import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

import ProblemTable from './ProblemTable'
import ProblemToolbar from './ProblemToolbar'
import mockData from './data'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const ProblemList = () => {
  const classes = useStyles()

  const [users] = useState(mockData)

  return (
    <div className={classes.root}>
      <ProblemToolbar />
      <div className={classes.content}>
        <ProblemTable users={users} />
      </div>
    </div>
  )
}

export default ProblemList
