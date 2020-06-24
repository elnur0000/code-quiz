import React from 'react'
import {
  Dialog,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListSubheader
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  grid: {
    margin: theme.spacing(0),
    flexGrow: 0,
    maxWidth: '100%',
    flexBasis: '100%'
  }

}))

const TestReportsDialog = ({ submittedProblems, ...rest }) => {
  return (
    <Dialog {...rest}>
      <List subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Submitted Problems
        </ListSubheader>
      }
      >
        {submittedProblems.length ? submittedProblems.map((submittedProblem) => (
          <ListItem
            key={submittedProblem._id}
            component={Link}
            to={{
              pathname: `/problem/${submittedProblem.problem._id}`,
              state: {
                code: submittedProblem.code
              }
            }}
          >
            <ListItemText primary={submittedProblem.problem.name} secondary='click for the code' />
          </ListItem>
        ))
          : <ListItem button>
            <ListItemText primary="candidate haven't submitted a problem" />
          </ListItem>}

      </List>
    </Dialog>
  )
}

export default TestReportsDialog
