import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import ProblemAddDialog from './ProblemAddDialog'
import Transition from '../Transition'
import { addProblem } from '../../actions/problem'

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

const ProblemToolbar = ({ className, addProblem, ...rest }) => {
  const classes = useStyles()

  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const handleAddDialogClose = () => {
    setAddDialogIsOpen(false)
  }

  const handleAddDialogOpen = () => {
    setAddDialogIsOpen(true)
  }

  const handleAddProblem = (problem) => {
    addProblem(problem)
    setAddDialogIsOpen(false)
  }

  return (
    <>
      <ProblemAddDialog
        fullScreen
        open={addDialogIsOpen}
        onClose={handleAddDialogClose}
        onSubmit={handleAddProblem}
        TransitionComponent={Transition}
      />
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.row}>
          <span className={classes.spacer} />
          {/* <Button className={classes.importButton}>Import</Button> */}
          {/* <Button className={classes.exportButton}>Export</Button> */}
          <Button
            color='secondary'
            variant='contained'
            onClick={handleAddDialogOpen}
          >
         Create Custom Problem
          </Button>
        </div>
        <div className={classes.row}>
          {/* <SearchInput
          className={classes.searchInput}
          placeholder='Search user'
        /> */}
        </div>
      </div>
    </>
  )
}

ProblemToolbar.propTypes = {
  addProblem: PropTypes.func.isRequired
}

export default connect(null, { addProblem })(ProblemToolbar)
