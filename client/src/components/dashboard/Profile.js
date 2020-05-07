import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Typography } from '@material-ui/core'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}))

const Profile = ({ className, user }) => {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt='Person'
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to='/settings'
      />
      <Typography
        className={classes.name}
        variant='h6'
      >
        {user.name}
      </Typography>
      <Typography variant='body2'>{user.email}</Typography>
    </div>
  )
}

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
}

const mapStateProps = state => ({
  user: state.auth.user
})

export default connect(mapStateProps)(Profile)
