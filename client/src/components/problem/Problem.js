import React, { useState, useEffect } from 'react'
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
import ProblemDescription from './ProblemDescription'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProblem } from '../../actions/problem'
import Spinner from '../layout/Spinner'
import { runCode, submitProblem } from '../../actions/editor'
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

const Problem = ({ runCode, match, getProblem, submitProblem, problem }) => {
  const classes = useStyles()

  useEffect(() => {
    getProblem(match.params.id)
  }, [])

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
    submitProblem(match.params.id, code, language)
  }

  if (!problem) {
    return <Spinner />
  }
  return (
    <div className={classes.root}>
      <ProblemDescription problem={problem} handleDrawerClose={handleDrawerClose} open={open} />

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

Problem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  getProblem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  problem: state.problem.problem
})

export default connect(mapStateToProps, { getProblem, runCode, submitProblem })(Problem)
