import { Collapse, withStyles, Grid } from '@material-ui/core'

import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/mode-markdown'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main
  }
}))(Tabs)

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      color: theme.palette.secondary.main,
      opacity: 1
    },
    '&$selected': {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: theme.palette.secondary.main
    }
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // height: '11.5rem',
    backgroundColor: theme.palette.background.paper
  },
  editor: {
    border: '1px solid grey',
    // padding: '7px 0 0 10px',
    '&:enabled': {
      transition: 'border-color 0.18s ease-in-out',
      border: `1px solid ${theme.palette.secondary.main}`

    }
  },
  valueBox: {
    padding: '0.5rem',
    overflowX: 'auto',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgb(238, 238, 238)',
    borderImage: 'initial',
    borderRadius: '3px',
    background: 'rgb(240, 240, 240)'
  }

}))

const CodeEditorResult = ({ tabIndex, dispatch, tabIndexChange, editor, stdin, onStdinChange, ...rest }) => {
  const classes = useStyles()

  return (
    <Collapse {...rest}>
      <div className={classes.root}>
        <AppBar position='static'>
          <AntTabs variant='standard' value={tabIndex} onChange={tabIndexChange} aria-label='simple tabs example'>
            <AntTab label='Stdin' {...a11yProps(0)} />
            <AntTab label='Run Code Result' {...a11yProps(1)} />
          </AntTabs>
        </AppBar>
        <TabPanel value={tabIndex} index={0}>
          <AceEditor
            placeholder='Placeholder Text'
            mode='markdown'
            theme='tomorrow'
            name='blah2'
            width='100%'
            height='15rem'
            className={classes.editor}
            // onLoad={this.onLoad}
            onChange={onStdinChange}
            fontSize={16}
            showPrintMargin
            // onFocus={(e) => console.log('hello world')}
            showGutter={false}
            highlightActiveLine={false}
            value={stdin}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: false,
              tabSize: 2
            }}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {
            editor.result
              ? editor.result.stderr
                ? <Alert severity='error'>{editor.result.stderr}</Alert>
                : <Grid
                  spacing={2}
                  justify='center'
                  alignItems='center' container
                >

                  {
                    editor.submitted
                      ? <Grid item xs={12}>
                        <Typography variant='subtitle1' style={{ color: editor.result.success ? 'green' : 'red' }}>{editor.result.success
                          ? <>
                          Accepted <br />
                            <Typography variant='caption' color='textSecondary'>all {editor.result.testcaseCount} test cases passed successfully</Typography>
                            </>
                          : 'Wrong Answer'}
                        </Typography>
                        </Grid>
                      : null
                  }
                  {
                    !editor.result.success
                      ? <>
                        <Grid
                          item xs={2}
                        >
                          <Typography>Your input</Typography>

                        </Grid>
                        <Grid item xs={10}>
                          <div className={classes.valueBox}>
                            {
                              editor.submitted
                                ? editor.result.stdin
                                : stdin
                            }
                          </div>
                        </Grid>
                        <Grid
                          item xs={2}
                        >
                          <Typography>Output</Typography>

                        </Grid>
                        <Grid item xs={10}>
                          <div className={classes.valueBox}>
                            {editor.result.stdout}
                          </div>
                        </Grid>
                        {
                          editor.submitted
                            ? <>
                              <Grid
                                item xs={2}
                              >
                                <Typography>Expected</Typography>

                              </Grid>
                              <Grid item xs={10}>
                                <div className={classes.valueBox}>
                                  {editor.result.expectedStdout}
                                </div>
                              </Grid>
                              </>
                            : null
                        }

                        </>
                      : null
                  }
                  </Grid>
              : <Typography style={{ textAlign: 'center' }} color='textSecondary'>Please run your code first</Typography>
          }

        </TabPanel>
      </div>
    </Collapse>
  )
}

const mapStateToProps = state => ({
  editor: state.editor
})
export default connect(mapStateToProps)(CodeEditorResult)
