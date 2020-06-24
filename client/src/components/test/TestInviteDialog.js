import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress
} from '@material-ui/core'
import { getGroups } from '../../actions/group'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const moment = require('moment-timezone')

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
const TestInviteDialog = ({ loading, getGroups, groups, ...rest }) => {
  const classes = useStyles()
  const [groupId, setGroupId] = React.useState('')
  const [validFrom, setValidFrom] = React.useState('2017-05-24T10:30')
  const [expiresAt, setExpiresAt] = React.useState('2017-05-24T10:30')
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')

  useEffect(() => {
    getGroups()
  }, [getGroups])

  const handleChange = (event) => {
    setGroupId(event.target.value)
  }
  return (
    <Dialog {...rest}>

      <DialogTitle id='form-dialog-title'><Typography>Invite a Candidate</Typography></DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container item spacing={0}>
              <Grid item xs={6}>
                <TextField
                  id='datetime-local'
                  label='Start Time'
                  value={validFrom}
                  onChange={(e) => {
                    return setValidFrom(e.target.value)
                  }}
                  type='datetime-local'
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  id='datetime-local'
                  label='Finish Time'
                  type='datetime-local'
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <InputLabel id='demo-simple-select-label'>Group</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={groupId}
                onChange={handleChange}
              >
                {
                  groups.map(group => <MenuItem key={group._id} value={group._id}>{group.name}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={rest.onClose} color='secondary'>
            Cancel
        </Button>
        <Button disabled={!groupId ? loading || !name || !email || !expiresAt || !validFrom : loading || !expiresAt || !validFrom} onClick={() => rest.onSubmit({ name, email, expiresAt: moment(expiresAt).utc(0).toString(), validFrom: moment(validFrom).utc(0).toString(), groupId })} color='secondary'>
          {loading ? <CircularProgress color='secondary' size={24} className={classes.buttonProgress} /> : 'Invite'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TestInviteDialog.propTypes = {
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  groups: state.group.groups
})

export default connect(mapStateToProps, { getGroups })(TestInviteDialog)
