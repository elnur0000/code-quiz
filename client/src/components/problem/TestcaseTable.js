import React from 'react'
import {
  TableCell,
  Collapse,
  Box,
  TextField
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { addTestcase, editTestcase, deleteTestcase } from '../../actions/problem'
import { connect } from 'react-redux'

const TestcaseTable = ({ testcaseTableIsOpen, deleteTestcase, addTestcase, editTestcase, problem }) => {
  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Input',
        field: 'input',
        render: (row) => {
          return <TextField
            inputProps={{
              readOnly: true,
              disabled: true
            }}
            multiline
            value={row.input}
            placeholder='Input'
          />
        },
        editComponent: (column) => {
          return <TextField

            multiline
            onChange={(e) => column.onChange(e.target.value)}
            value={column.value}
            placeholder='Input'
          />
        }
      },
      {
        title: 'Output',
        field: 'output',
        render: (row) => {
          return <TextField
            inputProps={{
              readOnly: true,
              disabled: true
            }}
            multiline
            value={row.output}
            placeholder='Output'
          />
        },
        editComponent: (column) => {
          console.log(column)
          return <TextField
            multiline
            onChange={(e) => column.onChange(e.target.value)}
            value={column.value}
            placeholder='Output'
          />
        }
      }
    ]
  })
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={testcaseTableIsOpen} timeout='auto' unmountOnExit>
        <Box margin={1}>
          <MaterialTable
            title='Testcases'
            columns={state.columns}
            data={problem.testcases}
            options={{
              search: false
            }}
            editable={{
              onRowAdd: (newData, err) => addTestcase(problem._id, newData),
              onRowUpdate: (newData, oldData) => {
                const { _id, ...newTestcase } = newData
                return editTestcase(problem._id, newTestcase, _id)
              },
              onRowDelete: (oldData) => deleteTestcase(problem._id, oldData._id)
            }}
          />
        </Box>
      </Collapse>
    </TableCell>
  )
}

export default connect(null, { addTestcase, deleteTestcase, editTestcase })(TestcaseTable)
