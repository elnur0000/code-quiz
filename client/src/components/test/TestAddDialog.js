import React, { useEffect } from 'react'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  ListItemIcon,
  CardActions,
  CardHeader
} from '@material-ui/core'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getProblems } from '../../actions/problem'

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
    maxWidth: '100%',
    flexBasis: '100%'
  }
}))

function not (a, b) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection (a, b) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

function union (a, b) {
  return [...a, ...not(b, a)]
}

const TestAddDialog = ({ problems, getProblems, ...rest }) => {
  const classes = useStyles()

  useEffect(() => {
    getProblems()
  }, [getProblems])

  useEffect(() => {
    setLeft(problems)
  }, [problems])

  const [allowedLanguages, setAllowedLanguages] = React.useState({
    nodejs: true,
    c: true,
    java: true,
    cpp: true,
    python: true
  })

  const [name, setName] = React.useState('')

  const handleChange = (event) => {
    setAllowedLanguages({ ...allowedLanguages, [event.target.name]: event.target.checked })
  }

  const [checked, setChecked] = React.useState([])
  const [left, setLeft] = React.useState([])
  const [right, setRight] = React.useState([])

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items) => intersection(checked, items).length

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }
  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component='div' role='list'>
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItem key={value} role='listitem' button onClick={handleToggle(value)}>

              <Card className={classes.problemCard}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}><Typography variant='subtitle1' className={classes.problemCardHeader}>{value.name}</Typography></Grid>
                    <Grid item xs={12}><Typography variant='subtitle2'>Description :</Typography><Typography>{value.description}</Typography></Grid>
                    <Grid item xs={12}><Typography variant='subtitle2'>Recommended Time for Problem :</Typography><Typography>~ minutes</Typography></Grid>
                    <Grid item xs={12}><Typography variant='subtitle2'>Difficulty :</Typography><Typography>{value.description}</Typography></Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                </CardActions>
              </Card>

            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )
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
              <Button disabled={!name || !Object.values(allowedLanguages).includes(true) || !right.length} autoFocus variant='outlined' color='secondary' onClick={() => rest.onSubmit({ allowedLanguages, name, problems: right })}>
         Add
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.toolbarMargin} />
          <Grid container item spacing={3}>
            <Grid item xs={6}>
              <TextField
                name='name'
                variant='outlined'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                id='name'
                label='Test Name'
                // onChange={e => onChange(e)}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container item spacing={0}>
                <Grid item xs={12}>
                  <Typography>Select the Programming Language:</Typography>
                </Grid>
                <FormControlLabel
                  control={<Checkbox checked={allowedLanguages.nodejs} onChange={handleChange} name='nodejs' />}
                  label='Node.js'
                />
                <FormControlLabel
                  control={<Checkbox checked={allowedLanguages.c} onChange={handleChange} name='c' />}
                  label='C'
                />
                <FormControlLabel
                  control={<Checkbox checked={allowedLanguages.java} onChange={handleChange} name='java' />}
                  label='Java'
                />
                <FormControlLabel
                  control={<Checkbox checked={allowedLanguages.cpp} onChange={handleChange} name='cpp' />}
                  label='C++'
                />
                <FormControlLabel
                  control={<Checkbox checked={allowedLanguages.python} onChange={handleChange} name='python' />}
                  label='Python'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container item spacing={2} justify='center' alignItems='center' className={classes.problemListContainer}>
            <Grid item>{customList('Available Problems', left)}</Grid>
            <Grid item>
              <Grid container direction='column' alignItems='center'>
                <Button
                  variant='outlined'
                  size='small'
                  className={classes.button}
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label='move selected right'
                >
            &gt;
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  className={classes.button}
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label='move selected left'
                >
            &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList('Selected Problems', right)}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  )
}

TestAddDialog.propTypes = {
  getProblems: PropTypes.func.isRequired,
  problems: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  problems: state.problem.problems
})

export default connect(mapStateToProps, { getProblems })(TestAddDialog)
