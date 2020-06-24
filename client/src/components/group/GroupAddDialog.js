import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function FormDialog ({ onSubmit, group, isEdit, ...rest }) {
  const [name, setName] = useState(group ? group.name : '')
  return (

    <Dialog {...rest} onClose={rest.onClose}>
      <DialogTitle id='form-dialog-title'>{isEdit ? 'Edit a Group' : 'Add a Group'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Please enter a name for the group
        </DialogContentText>
        <TextField
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin='dense'
          id='name'
          label='Name'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={rest.onClose} color='secondary'>
            Cancel
        </Button>
        <Button onClick={(e) => onSubmit({ name })} color='secondary'>
          {isEdit ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
