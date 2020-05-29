import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Select
} from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import AceEditor from 'react-ace'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
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

export default function PersistentDrawerLeft () {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [code, setCode] = useState('')

  function onChange (newValue) {
    setCode(newValue)
  }

  const [language, setLanguage] = React.useState('java')

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <ProblemDescription handleDrawerClose={handleDrawerClose} open={open} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <CssBaseline />
        <CodeEditor code={code} handleDrawerOpen={handleDrawerOpen} open={open} onChange={onChange} />

      </main>
    </div>
  )
}
