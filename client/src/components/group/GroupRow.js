import React, { useState } from 'react'
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  makeStyles
} from '@material-ui/core'
import MaterialTable from 'material-table'

import ConfirmationDialog from '../shared-dialogs/ConfirmationDialog'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
}
  from '@material-ui/icons'

import Transition from '../Transition'

import { addUser, editUser, deleteUser, deleteGroup, editGroup } from '../../actions/group'
import GroupEditDialog from './GroupAddDialog'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})

function GroupRow ({ group, editGroup, deleteGroup, addUser, editUser, deleteUser }) {
  const [open, setOpen] = React.useState(false)
  const [confirmationDialogIsOpen, setConfirmationDialogIsOpen] = useState(false)

  const handleConfirmationDialogOpen = group => {
    setConfirmationDialogIsOpen(true)
  }

  const onDeleteConfirmation = () => {
    deleteGroup(group._id)
    setConfirmationDialogIsOpen(false)
  }

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogIsOpen(false)
  }

  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)

  const handleEditDialogClose = () => {
    setEditDialogIsOpen(false)
  }

  const handleEditDialogOpen = () => {
    setEditDialogIsOpen(true)
  }

  const handleEditGroup = (newGroup) => {
    editGroup(group._id, newGroup)
    setEditDialogIsOpen(false)
  }
  const classes = useStyles()

  return (
    <>
      <ConfirmationDialog
        open={confirmationDialogIsOpen}
        onClose={handleConfirmationDialogClose}
        message='You are about to delete this group'
        onConfirmation={onDeleteConfirmation}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      />

      <GroupEditDialog
        open={editDialogIsOpen}
        isEdit
        group={group}
        onClose={handleEditDialogClose}
        onSubmit={handleEditGroup}
        TransitionComponent={Transition}
      />
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='center' component='th' scope='row'>
          {group.name}
        </TableCell>

        <TableCell align='right'>
          <IconButton onClick={() => handleEditDialogOpen()} color='secondary' size='small'>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleConfirmationDialogOpen()} color='secondary' style={{ marginLeft: '1rem' }} size='small'>
            <DeleteIcon />
          </IconButton>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <MaterialTable
                title='Candidates'
                columns={[
                  { title: 'Name', field: 'name' },
                  { title: 'Email', field: 'email' }
                ]}
                data={group.users}
                editable={{
                  onRowAdd: (newData, err) => addUser(group._id, newData),
                  onRowUpdate: (newData, oldData) => {
                    const { _id, ...newTestcase } = newData
                    return editUser(group._id, newTestcase, _id)
                  },
                  onRowDelete: (oldData) => deleteUser(group._id, oldData._id)
                }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default connect(null, { addUser, editGroup, deleteGroup, editUser, deleteUser })(GroupRow)
