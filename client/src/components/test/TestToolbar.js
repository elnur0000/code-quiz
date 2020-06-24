import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import TestAddDialog from './TestAddDialog'
import Transition from '../Transition'
import { addTest } from '../../actions/test'
import { connect } from 'react-redux'

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

const TestToolbar = ({ className, addTest, ...rest }) => {
  const classes = useStyles()

  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const handleAddDialogClose = () => {
    setAddDialogIsOpen(false)
  }

  const handleAddDialogOpen = () => {
    setAddDialogIsOpen(true)
  }
  const handleAddTest = (newTest) => {
    const allowedLanguages = []
    for (const key in newTest.allowedLanguages) {
      if (newTest.allowedLanguages[key]) {
        switch (key) {
          case 'nodejs':
            allowedLanguages.push('Node.js')
            break
          case 'c':
            allowedLanguages.push('C')
            break
          case 'java':
            allowedLanguages.push('Java')
            break
          case 'cpp':
            allowedLanguages.push('C++')
            break
          case 'python':
            allowedLanguages.push('Python')
            break
        }
      }
    }
    newTest.allowedLanguages = allowedLanguages
    newTest.problems = newTest.problems.map(problem => problem._id)
    addTest(newTest)
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
        onSubmit={handleAddTest}
      />
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button> */}
        {/* <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color='secondary'
          variant='contained'
          onClick={handleAddDialogOpen}
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
  className: PropTypes.string,
  addTest: PropTypes.func.isRequired
}

export default connect(null, { addTest })(TestToolbar)
