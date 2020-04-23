import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import cplus from '../../img/C++.svg'
import c from '../../img/C.svg'
import python from '../../img/Python.svg'
import java from '../../img/Java.svg'
import nodejs from '../../img/Nodejs.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.black
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(25),
    position: 'relative'
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180
  },
  h6: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  languageLogo: {
    height: '4rem',
    marginRight: theme.spacing(5)
  }
}))
const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <Container className={classes.container}>
        <img
          src='pattern.png'
          className={classes.curvyLines}
          alt='curvy lines'
        />
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={12}>
            <Typography color='inherit' align='center' variant='h5' marked='center'>
        CodeQuiz helps you to hire the right coders or test the coding knowledge of students by creating interactive competitive programming problems
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.h6} color='inherit' align='center' variant='h6' marked='center'>
        Programming languages/frameworks we currently support:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img alt='c++' className={classes.languageLogo} src={cplus} />
            <img alt='c' className={classes.languageLogo} src={c} />
            <img alt='nodejs' className={classes.languageLogo} src={nodejs} />
            <img alt='java' className={classes.languageLogo} src={java} />
            <img alt='python' className={classes.languageLogo} src={python} />
          </Grid>
        </Grid>
      </Container>

    </footer>
  )
}

export default Footer
