import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  LinearProgress,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import {
  PlayArrow as PlayIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon
} from '@material-ui/icons'
import { connect } from 'react-redux'
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

const CodeEditorFooter = ({ handleSubmitCode, setTabIndex, code, editor, stdin, language, handleRunCode, open, setResultIsOpen, resultIsOpen }) => {
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

        {!editor.loading
          ? <>
            <Button onClick={handleConsoleToggle} style={{ textTransform: 'none', color: 'white' }} variant='text'>Console</Button>
            <IconButton onClick={handleConsoleToggle} edge='start' color='inherit' aria-label='open drawer'>
              {resultIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
            </>
          : <LinearProgress style={{ width: '10rem' }} variant='query' color='secondary' />}

        <div className={classes.grow} />
        {
          !editor.loading && code
            ? <>
              <Button
                disabled={editor.loading || !stdin} onClick={
                  () => {
                    handleRunCode(language, stdin)
                    setResultIsOpen(true)
                    setTabIndex(1)
                  }
                } style={{ textTransform: 'none' }} edge='end' size='small' variant='contained' className={classes.runButton}
              >
                <PlayIcon fontSize='small' />
                <Typography variant='body2'>Run Code</Typography>
              </Button>
              <Button
                onClick={
                  () => {
                    handleSubmitCode(language)
                    setResultIsOpen(true)
                    setTabIndex(1)
                  }
                }
                disabled={editor.loading}
                style={{ textTransform: 'none' }}
                edge='end'
                size='small'
                variant='contained'
                color='secondary'
              >
                <Typography variant='body2'> Submit</Typography>
              </Button>
            </>
            : null
        }

      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  editor: state.editor
})

export default connect(mapStateToProps)(CodeEditorFooter)
