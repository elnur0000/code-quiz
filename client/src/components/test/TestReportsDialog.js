import React from 'react'
import {
  Dialog,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core'

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
  },
  list: {
    height: '30rem'
  }

}))

const TestReportsDialog = ({ reports, ...rest }) => {
  const classes = useStyles()

  return (
    <Dialog {...rest}>
      <List
        className={classes.list}
      >
        {reports.length ? reports.map((report) => (
          <ListItem button key={report}>
            <ListItemText primary={
              <>
                <Typography variant='subtitle2' color='secondary'>{report.slice(report.indexOf('at'))}</Typography>
                <Typography>{report.slice(0, report.indexOf('at'))}</Typography>
              </>
            }
            />
          </ListItem>
        ))
          : <ListItem button>
            <ListItemText primary={
              <>
                <Typography>No reports found for this candidate</Typography>
              </>
            }
            />
          </ListItem>}

      </List>
    </Dialog>
  )
}

export default TestReportsDialog
