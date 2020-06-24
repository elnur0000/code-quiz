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
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

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

const ProblemDescription = ({ open, setActiveStep, handleDrawerClose, problem, maxSteps, activeStep }) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>

        <Typography variant='subtitle1'>{problem.name}
          <Typography
            style={
              {
                color: problem.difficulty === 'Easy' ? 'green' : problem.difficulty === 'Medium' ? 'orange' : 'red',
                textAlign: 'left',
                marginLeft: '0.5rem'
              }
            }
          >{problem.difficulty}
          </Typography>
        </Typography>

        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>

      <Divider />
      {/* <div className={classes.problemBody}> */}
      <ReactQuill
        theme='bubble'
        key='1'
        value={problem.body}
        readOnly
      />

      {/* </div> */}
      {
        maxSteps
          ? <ProblemDescriptionFooter setActiveStep={setActiveStep} maxSteps={maxSteps} activeStep={activeStep} />
          : null
      }

    </Drawer>
  )
}

export default ProblemDescription
