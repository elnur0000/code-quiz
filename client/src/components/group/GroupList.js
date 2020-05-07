import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

import GroupTable from './GroupTable'
import mockData from './data'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const GroupList = () => {
  const classes = useStyles()

  const [groups] = useState(mockData)

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <GroupTable groups={groups} />
      </div>
    </div>
  )
}

export default GroupList
