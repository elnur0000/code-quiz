import React, { useState, useRef, useEffect } from 'react'
import CodeEditorToolbar from './CodeEditorToolbar'
import CodeEditorFooter from './CodeEditorFooter'
import CodeEditorResult from './CodeEditorResult'
import AceEditor from 'react-ace'
import { makeStyles } from '@material-ui/core/styles'

import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-terminal'

import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/python'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-javascript'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    // necessary for content to be below app bar
    height: '2.5rem'
  }
  // editor: {
  //   marginTop: '4rem',
  //   position: 'absolute',
  //   left: '40%',
  //   marginBottom: '-4rem',
  //   top: 0,
  //   right: 0,
  //   ...theme.mixins.toolbar
  // }
}))

const CodeEditor = ({ handleSubmitCode, handleRunCode, code, onChange, handleDrawerOpen, open }) => {
  const classes = useStyles()
  const [language, setLanguage] = useState('python')
  const [theme, setTheme] = useState('github')
  const [fontSize, setFontSize] = useState('16')
  const [tabSize, setTabSize] = useState('4')
  const [resultIsOpen, setResultIsOpen] = useState(false)
  const [tabIndex, setTabIndex] = React.useState(0)
  const [stdin, setStdin] = useState(
`[2,7,11,15]
9`)

  const aceRef = useRef()

  function onStdinChange (newValue) {
    setStdin(newValue)
  }

  const tabIndexChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  useEffect(() => {
    aceRef.current.editor.resize()
  }, [resultIsOpen])
  return (
    <>
      {/* <div className={classes.box}> */}
      {/* <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
      > */}
      <CodeEditorToolbar
        setFontSize={setFontSize}
        fontSize={fontSize}
        setTheme={setTheme}
        tabSize={tabSize}
        setTabSize={setTabSize}
        theme={theme}
        setLanguage={setLanguage}
        language={language}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <div className={classes.toolbarMargin} />
      <AceEditor
        // className={classes.editor}
        style={{ width: '100%', height: `calc(100vh - ${4.5 + (resultIsOpen ? 20.5 : 0)}rem)`, minWidth: 600 }}
        mode={language === 'c' || language === 'cpp' ? 'c_cpp' : language === 'node' ? 'javascript' : language}
        value={code}
        theme={theme}
        height='100%'
        width='100%'
        onChange={onChange}
        ref={aceRef}
        name='UNIQUE_ID_OF_DIV'
        fontSize={fontSize}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize
        }}
      />
      <CodeEditorResult stdin={stdin} tabIndex={tabIndex} tabIndexChange={tabIndexChange} onStdinChange={onStdinChange} in={resultIsOpen} timeout={0} unmountOnExit />
      <CodeEditorFooter
        code={code}
        stdin={stdin}
        language={language}
        handleRunCode={handleRunCode}
        handleSubmitCode={handleSubmitCode}
        setTabIndex={setTabIndex}
        open={open}
        resultIsOpen={resultIsOpen}
        setResultIsOpen={setResultIsOpen}
      />
      {/* </Grid> */}
      {/* </div> */}
    </>
  )
}

export default CodeEditor
