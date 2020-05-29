import React from 'react'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  makeStyles,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  ListItemIcon,
  CardActions,
  CardHeader,
  DialogTitle,
  ListSubheader,
  Avatar,
  ListItemAvatar
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
    height: '20rem'
  }

}))
const emails = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const TestReportsDialog = props => {
  const classes = useStyles()

  return (
    <Dialog {...props}>
      <List
        className={classes.list}
      >
        {emails.map((email) => (
          <ListItem button key={email}>
            <ListItemText primary={
              <>
                <Typography variant='subtitle2' color='secondary'>[10/May/2020:01:13:15 +0000]</Typography>
                <Typography>switched to another window, oh snap</Typography>
              </>
            }
            />
          </ListItem>
        ))}

      </List>
    </Dialog>
  )
}

export default TestReportsDialog
