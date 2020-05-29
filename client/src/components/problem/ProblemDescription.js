import React from 'react'
import {
  Drawer,
  Typography,
  IconButton,
  Divider,
  makeStyles,
  useTheme
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ProblemDescriptionFooter from './ProblemDescriptionFooter'

const drawerWidth = '42.5%'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    // marginTop: '0.1rem',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: '-42.5%'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  problemBody: {
    margin: '1.5rem'

  },
  select: {
    color: 'white',
    width: '5rem',
    marginRight: '0.5rem',
    '&:before': {
      borderColor: theme.palette.secondary.main
    },
    '&:after': {
      borderColor: theme.palette.secondary.main
    }
  },
  icon: {
    fill: theme.palette.secondary.main
  }
}))

const ProblemDescription = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={props.open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>

        <Typography variant='subtitle1'>1. Two Sum <Typography style={{ color: 'green', textAlign: 'left', marginLeft: '0.5rem' }}>Easy</Typography></Typography>

        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>

      <Divider />
      <div className={classes.problemBody}>
  Write a program to print the square of an inputted integer.<br />
        <br />
For example,<br />
        <br />
For the input provided as follows to the program:<br />
        <br />
3<br />
        <br />
The output of the program will be:<br />
        <br />
9
      </div>
      <ProblemDescriptionFooter />
    </Drawer>
  )
}

export default ProblemDescription
