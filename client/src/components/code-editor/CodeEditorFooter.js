import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Collapse } from '@material-ui/core'
import { PlayArrow as PlayIcon } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    height: '2rem'
  },
  toolbar: {
    minHeight: '2rem'
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  runButton: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#e6e6e6'
    },
    marginRight: theme.spacing(2)
  },
  appBarShift: {
    width: '57.5%',
    marginLeft: '42.5%',
    height: '2rem',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}))

const CodeEditorFooter = ({ open, setResultIsOpen, resultIsOpen }) => {
  const classes = useStyles()
  const handleConsoleToggle = (e) => {
    setResultIsOpen(!resultIsOpen)
  }
  return (
    <AppBar
      position='fixed' color='primary' className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar className={classes.toolbar}>

        <Button onClick={handleConsoleToggle} style={{ textTransform: 'none', color: 'white' }} variant='text'>Console</Button>
        <IconButton onClick={handleConsoleToggle} edge='start' color='inherit' aria-label='open drawer'>
          {resultIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
        <div className={classes.grow} />
        <Button style={{ textTransform: 'none' }} edge='end' size='small' variant='contained' className={classes.runButton}>
          <PlayIcon fontSize='small' />
          <Typography variant='body2'>Run Code</Typography>
        </Button>
        <Button style={{ textTransform: 'none' }} edge='end' size='small' variant='contained' color='secondary'>
          <Typography variant='body2'> Submit</Typography>
        </Button>

      </Toolbar>
    </AppBar>
  )
}

export default CodeEditorFooter
