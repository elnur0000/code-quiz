import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import GroupAddDialog from './GroupAddDialog'
import Transition from '../Transition'
import { addGroup } from '../../actions/group'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}))

const GroupToolbar = ({ className, addGroup, ...rest }) => {
  const classes = useStyles()

  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const handleAddDialogClose = () => {
    setAddDialogIsOpen(false)
  }

  const handleAddDialogOpen = () => {
    setAddDialogIsOpen(true)
  }

  const handleAddGroup = (group) => {
    addGroup(group)
    setAddDialogIsOpen(false)
  }

  return (
    <>
      <GroupAddDialog
        open={addDialogIsOpen}
        onClose={handleAddDialogClose}
        onSubmit={handleAddGroup}
        TransitionComponent={Transition}
      />
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            color='secondary'
            variant='contained'
            onClick={handleAddDialogOpen}
          >
         Create Group
          </Button>
        </div>

      </div>
    </>
  )
}

GroupToolbar.propTypes = {
  addGroup: PropTypes.func.isRequired
}

export default connect(null, { addGroup })(GroupToolbar)
