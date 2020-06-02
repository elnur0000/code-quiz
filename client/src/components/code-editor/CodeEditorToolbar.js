import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  FormControl,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'

import {
  Menu as MenuIcon,
  SettingsApplications as SettingsApplicationsIcon
} from '@material-ui/icons'
import CodeEditorSettingsDialog from './CodeEditorSettingsDialog'

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '2.5rem',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    minHeight: '2.5rem'
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    height: '2.5rem',
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
  }

}))

const CodeEditorToolbar = ({
  setTheme,
  theme,
  setFontSize,
  fontSize,
  setLanguage,
  language,
  handleDrawerOpen,
  tabSize,
  setTabSize,
  open
}) => {
  const classes = useStyles()
  const [settingsIsOpen, setSettingsIsOpen] = React.useState(false)

  const handleClickOpen = () => {
    setSettingsIsOpen(true)
  }
  const handleClose = () => {
    setSettingsIsOpen(false)
  }

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
      style={{ boxShadow: 'none' }}
    >
      <CodeEditorSettingsDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={settingsIsOpen}
        setTheme={setTheme}
        tabSize={tabSize}
        setTabSize={setTabSize}
        theme={theme}
        setFontSize={setFontSize}
        fontSize={fontSize}
      />
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='secondary'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Grid
          item container direction='row'
          alignItems='center'
          justify='flex-end'
          spacing={3}
        >
          <FormControl variant='standard' className={classes.select} size='small'>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={language}
              className={classes.select}
              IconComponent='style'
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value='java'>Java</MenuItem>
              <MenuItem value='python'>Python</MenuItem>
              <MenuItem value='cpp'>C++</MenuItem>
              <MenuItem value='javascript'>Node.js</MenuItem>
              <MenuItem value='c'>C</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={handleClickOpen}>
            <SettingsApplicationsIcon fontSize='large' color='secondary' />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default CodeEditorToolbar
