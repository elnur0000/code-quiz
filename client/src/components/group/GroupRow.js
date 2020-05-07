import React from 'react'
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  makeStyles
} from '@material-ui/core'
import MaterialTable from 'material-table'

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})

function GroupRow ({ row }) {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' }
    ]
  })
  const classes = useStyles()

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <MaterialTable
                title='Users'
                columns={state.columns}
                data={row.users}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve()
                        setState((prevState) => {
                          const data = [...prevState.data]
                          data.push(newData)
                          return { ...prevState, data }
                        })
                      }, 600)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve()
                        if (oldData) {
                          setState((prevState) => {
                            const data = [...prevState.data]
                            data[data.indexOf(oldData)] = newData
                            return { ...prevState, data }
                          })
                        }
                      }, 600)
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve()
                        setState((prevState) => {
                          const data = [...prevState.data]
                          data.splice(data.indexOf(oldData), 1)
                          return { ...prevState, data }
                        })
                      }, 600)
                    })
                }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default GroupRow
