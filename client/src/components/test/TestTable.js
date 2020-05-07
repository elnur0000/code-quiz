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
  Button
} from '@material-ui/core'

import {
  GroupAddTwoTone as GroupAddIcon,
  AssignmentTwoTone as Assignment,
  Delete as DeleteIcon
}
  from '@material-ui/icons'

import TestRow from './TestRow'

// import { getInitials } from 'helpers'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  tableRow: {
    fontSize: 'auto'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const TestTable = props => {
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
            <TableBody>
              {users.slice(0, rowsPerPage).map(user => (
                <TestRow key={user.id} row={user} />
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

TestTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
}

export default TestTable
