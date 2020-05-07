import React, { useState } from 'react'
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
  IconButton,
  Grid,
  Button,
  TableHead
} from '@material-ui/core'

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon
}
  from '@material-ui/icons'
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

const ProblemTable = props => {
  const { className, users, ...rest } = props

  const classes = useStyles()

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const handlePageChange = (event, page) => {
    setPage(page)
  }

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
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
              {users.slice(0, rowsPerPage).map(user => (
                <TableRow
                  className={classes.tableRow}
                  hover
                  key={user.id}
                >
                  <TableCell component='th' scope='row'>
                    <Typography>Square Problem</Typography>
                  </TableCell>

                  <TableCell align='center'>
                    <Typography>Easy</Typography>
                  </TableCell>

                  <TableCell align='center'>
                    <Typography>1</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Private</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>May 06, 2020</Typography>
                  </TableCell>
                  <TableCell className={classes.rowActions} align='center'>
                    <Tooltip title='Try it' aria-label='try'>
                      <Button color='secondary'>
                        <PlayIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title='Edit' aria-label='edit'>
                      <Button color='secondary'>
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title='Delete' aria-label='delete'>
                      <Button color='secondary'>
                        <DeleteIcon />
                      </Button>
                    </Tooltip>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component='div'
          count={users.length}
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
  users: PropTypes.array.isRequired
}

export default ProblemTable
