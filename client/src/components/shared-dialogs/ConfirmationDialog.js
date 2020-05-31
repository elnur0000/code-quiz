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

const ConfirmationDialog = ({ message, onConfirmation, ...rest }) => {
  const classes = useStyles()
  return (
    <Dialog
      {...rest}
    >
      <DialogTitle id='alert-dialog-title'><Typography>{message}</Typography></DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
       Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={rest.onClose} color='secondary'>
       No
        </Button>
        <Button onClick={onConfirmation} color='secondary' autoFocus>
       Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
