import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import GroupTable from './GroupTable'
import Alert from '../layout/Alert'
import { getGroups } from '../../actions/group'
import GroupToolbar from './GroupToolbar'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const GroupList = ({ getGroups, groups }) => {
  const classes = useStyles()

  useEffect(() => {
    getGroups()
  }, [getGroups])

  return (
    <div className={classes.root}>
      <Alert />
      <GroupToolbar />
      <div className={classes.content}>
        <GroupTable groups={groups} />
      </div>
    </div>
  )
}
GroupList.propTypes = {
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  groups: state.group.groups
})

export default connect(mapStateToProps, { getGroups })(GroupList)
