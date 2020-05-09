import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Button, Slide } from '@material-ui/core'
import TestAddDialog from './TestAddDialog'

// import { SearchInput } from 'components'

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
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TestToolbar = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const handleAddDialogClose = () => {
    setAddDialogIsOpen(false)
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <TestAddDialog
        fullScreen
        open={addDialogIsOpen}
        onClose={handleAddDialogClose}
        TransitionComponent={Transition}
      />
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button> */}
        {/* <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color='secondary'
          variant='contained'
          onClick={() => setAddDialogIsOpen(true)}
        >
          Create New Test
        </Button>
      </div>
      <div className={classes.row}>
        {/* <SearchInput
          className={classes.searchInput}
          placeholder='Search user'
        /> */}
      </div>
    </div>
  )
}

TestToolbar.propTypes = {
  className: PropTypes.string
}

export default TestToolbar
