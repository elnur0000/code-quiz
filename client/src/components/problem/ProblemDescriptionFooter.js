import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, MobileStepper, useTheme } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

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
    width: '42.5%',
    top: 'auto',
    right: '57.5%',
    bottom: 0,
    height: '2rem'
  },
  toolbar: {
    minHeight: '2rem',
    justifyContent: 'center',
    backgroundColor: 'white'

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

const CodeEditorFooter = ({ maxSteps, activeStep, setActiveStep }) => {
  const classes = useStyles()
  const theme = useTheme()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <AppBar
      position='fixed' color='default' className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <MobileStepper
          steps={maxSteps}
          position='static'
          variant='text'
          activeStep={activeStep}
          nextButton={
            <Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
            </Button>
          }
        />
      </Toolbar>
    </AppBar>
  )
}

export default CodeEditorFooter
