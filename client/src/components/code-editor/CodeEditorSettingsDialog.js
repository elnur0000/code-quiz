import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { FormControl, MenuItem, Select, InputLabel, Grid } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

export default function CustomizedDialogs ({
  setFontSize,
  setTheme,
  theme,
  tabSize,
  setTabSize,
  fontSize,
  ...rest
}) {
  return (

    <Dialog {...rest}>
      <DialogTitle id='customized-dialog-title' onClose={rest.onClose}>
        <Typography>Editor settings</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item xs={6}>
            <Typography>Font size</Typography>
            <Typography color='textSecondary' variant='caption'>Choose your preferred font size for the code editor.</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant='filled' size='small'>

              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                label='font size'
              >
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography>Theme</Typography>
            <Typography color='textSecondary' variant='caption'>Tired of the white background? Try different styles and syntax highlighting.</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant='filled' size='small'>

              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                label='theme'
              >
                <MenuItem value='github'>github</MenuItem>
                <MenuItem value='twilight'>twilight</MenuItem>
                <MenuItem value='monokai'>monokai</MenuItem>
                <MenuItem value='kuroir'>kuroir</MenuItem>
                <MenuItem value='textmate'>textmate</MenuItem>
                <MenuItem value='terminal'>terminal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography>Tab size</Typography>
            <Typography color='textSecondary' variant='caption'>Choose the width of a tab character.</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant='filled' size='small'>

              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={tabSize}
                onChange={(e) => setTabSize(e.target.value)}
                label='tab size'
              >
                <MenuItem value='2'>2 spaces</MenuItem>
                <MenuItem value='4'>4 spaces</MenuItem>
                <MenuItem value='8'>8 spaces</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={rest.onClose} color='secondary'>
            Save changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
