import React, { useState } from 'react'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Input,
  useTheme

} from '@material-ui/core'
import {
  Close as CloseIcon,
  HighlightOff as HighlightOffIcon
} from '@material-ui/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import 'draft-js/dist/Draft.css'

const useStyles = makeStyles((theme) => ({

  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  problemListContainer: {
    margin: 'auto'
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: '30.5rem',
    height: '30rem',
    backgroundColor: theme.palette.secondary.darkerLight,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  problemCard: {
    backgroundColor: theme.palette.secondary.light
  },
  problemCardHeader: {
    color: theme.palette.secondary.dark
  },
  toolbarMargin: {
    ...theme.mixins.toolbar
  },
  grid: {
    margin: theme.spacing(0),
    flexGrow: 0,
    maxWidth: '100%'
    // flexBasis: '100%'
  },
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  //   maxWidth: 300
  // }
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 99
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))

const skillNames = [
  'Strings',
  'Search',
  'Sorting',
  'Bit Manipulation',
  'Data Structures',
  'Stacks',
  'Trees',
  'Graph Theory',
  'Linked Lists',
  'Queues',
  'Geometry',
  'Probability',
  'Mathematics',
  'Dynamic Programming',
  'Divide and Conquer',
  'Recursion'
]

function getStyles (name, skills, theme) {
  return {
    fontWeight:
     skills.indexOf(name) === -1
       ? theme.typography.fontWeightRegular
       : theme.typography.fontWeightMedium
  }
}

const ProblemAddDialog = ({
  onSubmit,
  problem,
  isEdit,
  ...rest
}) => {
  const classes = useStyles()

  React.useEffect(() => {
    if (problem) {
      setDifficulty(problem.difficulty)
      setName(problem.name)
      setDescription(problem.description)
      setBody(problem.body)
      setSkills(problem.skills)
    }
  }, [problem])

  const [difficulty, setDifficulty] = useState('Easy')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [body, setBody] = useState('<p>Problem text...</p><p><strong>Input </strong></p><p>Input description...</p><p><strong>Output </strong></p><p>Output description...</p><p><strong>Example</strong></p><p><strong>Input:</strong></p><p>etc.</p><p><strong>Output:</strong></p><p>etc</p>')

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value)
  }
  const theme = useTheme()

  const [skills, setSkills] = React.useState([])

  const handleChipChange = (event) => {
    setSkills(event.target.value)
  }
  const handleChipDelete = (value) => {
    setSkills(skills.filter((p) => p !== value))
  }

  return (
    <Dialog {...rest}>
      <Grid
        container
        direction='row'
        justify='center'
        spacing={3}
        className={classes.grid}
        alignItems='center'
      >
        <Grid item xs={12}>
          <AppBar position='fixed' color='primary'>
            <Toolbar>
              <IconButton edge='start' color='inherit' onClick={rest.onClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='body1' className={classes.title}>
         Create a New Test
              </Typography>
              <Button
                disabled={!difficulty || !name || !body || !skills.length}
                autoFocus
                variant='outlined'
                color='secondary'
                onClick={() => onSubmit({ difficulty, name, skills, body, description })}
              >
                {isEdit ? 'Save' : 'Add'}
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.toolbarMargin} />
          <Grid container item spacing={3}>
            <Grid item xs={3}>
              <TextField
                name='name'
                variant='outlined'
                required
                fullWidth
                size='small'
                id='name'
                label='Name'
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                name='name'
                variant='outlined'
                required
                fullWidth
                size='small'
                id='name'
                label='Small Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container item spacing={3}>
            <Grid item xs={3}>
              <FormControl
                fullWidth margin='dense'
                variant='outlined'
                className={classes.formControl}
              >
                <InputLabel id='demo-simple-select-outlined-label'>Difficulty</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  label='Difficulty'
                >
                  <MenuItem value='Easy'>Easy</MenuItem>
                  <MenuItem value='Medium'>Medium</MenuItem>
                  <MenuItem value='Hard'>Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth margin='dense' variant='outlined' className={classes.formControl}>
                <InputLabel id='demo-mutiple-chip-label'>Skills</InputLabel>
                <Select
                  labelId='demo-mutiple-chip-label'
                  id='demo-mutiple-chip'
                  multiple
                  value={skills}
                  onChange={handleChipChange}
                  input={<Input id='select-multiple-chip' />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          onDelete={() => {}}
                          deleteIcon={
                            <div
                              onMouseDown={(event) => {
                                if (!rest.disabled) {
                                  event.stopPropagation()
                                  handleChipDelete(value)
                                }
                              }}
                            >
                              <HighlightOffIcon />
                            </div>
                          }
                          color='secondary'
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    getContentAnchorEl: null
                  }}
                >

                  {skillNames.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, skills, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>PROBLEM BODY</Typography>
              <Typography variant='caption'>Please use HTML editor to format the problem text</Typography>
            </Grid>
            <Grid item xs={12}>
              <ReactQuill
                theme='snow'
                key='1'
                value={body}
                onChange={setBody}
              />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Dialog>
  )
}

export default ProblemAddDialog
