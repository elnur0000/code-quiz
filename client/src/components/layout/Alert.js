import React from 'react'
import { connect } from 'react-redux'
import MaterialAlert from '@material-ui/lab/Alert'

const Alert = ({ alert }) => {
  return alert &&
    <MaterialAlert key={alert.id} severity={alert.type}>{alert.msg}</MaterialAlert>
}

const mapStateToProps = state => ({
  alert: state.alert
})

export default connect(mapStateToProps)(Alert)
