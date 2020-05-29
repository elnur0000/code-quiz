import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))
const TestInviteDialog = props => {
  const classes = useStyles()
  const [age, setAge] = React.useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }
  return (
    <Dialog {...props}>

      <DialogTitle id='form-dialog-title'><Typography>Invite a Candidate</Typography></DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container item spacing={0}>
              <Grid item xs={6}>
                <TextField
                  id='datetime-local'
                  label='Start Time'
                  type='datetime-local'
                  defaultValue='2017-05-24T10:30'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='datetime-local'
                  label='Finish Time'
                  type='datetime-local'
                  defaultValue='2017-05-24T10:30'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='name'
              required
              fullWidth
              margin='dense'
              id='name'
              label='Name'
            />
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={12}>
            OR
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin='dense' className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Age</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color='secondary'>
            Cancel
        </Button>
        <Button onClick={props.onClose} color='secondary'>
            Invite
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TestInviteDialog
