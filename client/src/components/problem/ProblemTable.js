import React, { useState, Fragment } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
// import moment from 'moment'
// import PerfectScrollbar from 'react-perfect-scrollbar'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  TablePagination,
  Tooltip,
  Button,
  TableHead
} from '@material-ui/core'

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon
} from '@material-ui/icons'
import { connect } from 'react-redux'

import { deleteProblem, editProblem } from '../../actions/problem'

import ConfirmationDialog from '../shared-dialogs/ConfirmationDialog'
import ProblemAddDialog from './ProblemAddDialog'
import Transition from '../Transition'
import { useHistory } from 'react-router-dom'
import PostAddIcon from '@material-ui/icons/PostAdd'
import TestcaseTable from './TestcaseTable'
import ProblemRow from './ProblemRow'

import Moment from 'react-moment'
// import { getInitials } from 'helpers'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 500
  },
  tableRow: {
    fontSize: 'auto'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  rowActions: {
    width: '25%'
  }
}))

const ProblemTable = ({ className, editProblem, deleteProblem, problems, ...rest }) => {
  const classes = useStyles()

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const history = useHistory()

  const handlePageChange = (event, page) => {
    setPage(page)
  }

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value)
  }

  const [confirmationDialogIsOpen, setConfirmationDialogIsOpen] = useState(false)
  const [selectedProblem, setSelectedProblem] = useState('')

  const handleConfirmationDialogOpen = problem => {
    setConfirmationDialogIsOpen(true)
    setSelectedProblem(problem)
  }
  const handleConfirmationDialogClose = () => {
    setConfirmationDialogIsOpen(false)
    setSelectedProblem('')
  }

  const onDeleteConfirmation = () => {
    deleteProblem(selectedProblem._id)
    setConfirmationDialogIsOpen(false)
  }

  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)

  const handleEditDialogClose = () => {
    setEditDialogIsOpen(false)
  }

  const handleEditDialogOpen = problem => {
    setEditDialogIsOpen(true)
    setSelectedProblem(problem)
  }

  const handleEditProblem = problem => {
    editProblem(selectedProblem._id, problem)
    setEditDialogIsOpen(false)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ConfirmationDialog
        open={confirmationDialogIsOpen}
        onClose={handleConfirmationDialogClose}
        message='You are about to delete this problem'
        onConfirmation={onDeleteConfirmation}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      />
      <ProblemAddDialog
        fullScreen
        isEdit
        problem={selectedProblem}
        open={editDialogIsOpen}
        onClose={handleEditDialogClose}
        onSubmit={handleEditProblem}
        TransitionComponent={Transition}
      />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography>Problem Name</Typography></TableCell>
                <TableCell align='center'><Typography>Difficulty</Typography></TableCell>
                <TableCell align='center'><Typography>Test cases</Typography></TableCell>
                <TableCell align='center'><Typography>Status</Typography></TableCell>
                <TableCell align='center'><Typography>Created On</Typography></TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.slice(0, rowsPerPage).map(problem => (
                <Fragment key={problem._id}>
                  <ProblemRow problem={problem} handleConfirmationDialogOpen={handleConfirmationDialogOpen} handleEditDialogOpen={handleEditDialogOpen} />
                </Fragment>
              ))}

            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component='div'
          count={problems.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  )
}

ProblemTable.propTypes = {
  className: PropTypes.string,
  problems: PropTypes.array.isRequired,
  deleteProblem: PropTypes.func.isRequired
}

export default connect(null, { deleteProblem, editProblem })(ProblemTable)
