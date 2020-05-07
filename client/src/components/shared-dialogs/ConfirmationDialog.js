import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  actionButton: {
    textTransform: 'none'
  }
}))

const ConfirmationDialog = props => {
  const classes = useStyles()
  return (
    <Dialog
      {...props}
    >
      <DialogTitle id='alert-dialog-title'><Typography>You are about to delete this resource</Typography></DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
       Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color='secondary'>
       No
        </Button>
        <Button onClick={props.onClose} color='secondary' autoFocus>
       Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
