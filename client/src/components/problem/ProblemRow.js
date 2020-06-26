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
import Moment from 'react-moment'

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

const ProblemRow = ({ problem, handleEditDialogOpen, handleConfirmationDialogOpen }) => {
  const classes = useStyles()
  const history = useHistory()
  const [testcaseTableIsOpen, setTestcaseTableIsOpen] = useState(false)
  return (
    <>

      <TableRow
        className={classes.tableRow}
        hover
      >
        <TableCell component='th' scope='row'>
          <Typography>{problem.name}</Typography>
        </TableCell>

        <TableCell align='center'>
          <Typography>{problem.difficulty}</Typography>
        </TableCell>

        <TableCell align='center'>
          <Typography>{problem.testcases.length}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography>{problem.isPublic ? 'Public' : 'Private'}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography><Moment date={problem.createdAt} format='D MMM YYYY' /></Typography>
        </TableCell>
        <TableCell className={classes.rowActions} align='center'>
          <Tooltip onClick={() => setTestcaseTableIsOpen(!testcaseTableIsOpen)} title='Manage testcases' aria-label='try'>
            <Button color='secondary'>
              <PostAddIcon />
            </Button>
          </Tooltip>
          <Tooltip onClick={() => history.push(`/problem/${problem._id}`)} title='Try it' aria-label='try'>
            <Button color='secondary'>
              <PlayIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Edit' aria-label='edit'>
            <Button onClick={() => handleEditDialogOpen(problem)} color='secondary'>
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Delete' aria-label='delete'>
            <Button onClick={() => handleConfirmationDialogOpen(problem)} color='secondary'>
              <DeleteIcon />
            </Button>
          </Tooltip>

        </TableCell>
      </TableRow>
      <TableRow>
        <TestcaseTable testcaseTableIsOpen={testcaseTableIsOpen} problem={problem} />

      </TableRow>
    </>
  )
}

export default ProblemRow
