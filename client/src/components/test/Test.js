import React, { useState, useContext, useEffect } from 'react'
import WebSocketProvider, { WebSocketContext } from '../../contexts/Websocket'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import CodeEditor from '../code-editor/CodeEditor'

import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/python'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-javascript'
import ProblemDescription from '../problem/ProblemDescription'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTestByAccessToken } from '../../actions/test'
import Spinner from '../layout/Spinner'
import { runCode, submitTest } from '../../actions/editor'
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

const Test = ({ runCode, match, getTestByAccessToken, submitTest, test, ...rest }) => {
  const classes = useStyles()
  const ws = useContext(WebSocketContext)

  const onBlur = (e) => {
    ws.socket.emit('event://blur', `Left the test at ${new Date()}`)
  }
  const onFocus = (e) => {
    ws.socket.emit('event://focus', `Returned back to the test at ${new Date()}`)
  }

  useEffect(() => {
    localStorage.setItem('accessToken', match.params.id)
    getTestByAccessToken(match.params.id)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = useState(true)
  const [code, setCode] = useState('')

  function handleCodeChange (newValue) {
    setCode(newValue)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleRunCode = (language, stdin) => {
    runCode(stdin, code, language)
  }

  const handleSubmitCode = (language) => {
    submitTest(test.problems[activeStep]._id, code, language, match.params.id)
  }

  if (!test) {
    return <Spinner />
  }
  return (
    <div className={classes.root}>
      <ProblemDescription setActiveStep={setActiveStep} maxSteps={test.problems.length} problem={test.problems[activeStep]} activeStep={activeStep} handleDrawerClose={handleDrawerClose} open={open} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <CssBaseline />
        <CodeEditor handleSubmitCode={handleSubmitCode} handleRunCode={handleRunCode} code={code} handleDrawerOpen={handleDrawerOpen} open={open} onChange={handleCodeChange} />

      </main>
    </div>
  )
}

Test.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  getTestByAccessToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  test: state.test.test
})

export default connect(mapStateToProps, { getTestByAccessToken, runCode, submitTest })(Test)
