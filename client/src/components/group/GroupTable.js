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
  Collapse,
  Box,
  Button,
  TableHead
} from '@material-ui/core'

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
}
  from '@material-ui/icons'

import GroupRow from './GroupRow'
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

const GroupTable = ({ className, groups, ...rest }) => {
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
              {groups.slice(0, rowsPerPage).map(group => (
                <GroupRow key={group.email} row={group} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component='div'
          count={groups.length}
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

GroupTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
}

export default GroupTable
