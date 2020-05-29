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
  }

}))
const emails = ['SQL sample test', 'SQL sample test', 'SQL sample test']

const TestReportsDialog = props => {
  const classes = useStyles()

  return (
    <Dialog {...props}>
      <List subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Submitted Problems
        </ListSubheader>
      }
      >
        {emails.map((email) => (
          <ListItem button key={email}>
            <ListItemText primary={email} secondary='1/10' />
          </ListItem>
        ))}

      </List>
    </Dialog>
  )
}

export default TestReportsDialog
