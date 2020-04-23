import React from 'react'
import { connect } from 'react-redux'
import MaterialAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
}))

const Alert = ({ alert }) => {
  const classes = useStyles()

  return alert &&
    <MaterialAlert key={alert.id} className={classes.root} severity={alert.type}>{alert.msg}</MaterialAlert>
}

const mapStateToProps = state => ({
  alert: state.alert
})

export default connect(mapStateToProps)(Alert)
