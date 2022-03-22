import { Box, IconButton, Link } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { AccountCircle, Close } from '@material-ui/icons'
import AdbIcon from '@material-ui/icons/Adb'
import Login from 'features/Auth/components/Login'
import Register from 'features/Auth/components/Register'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { logout } from 'features/Auth/userSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    cursor: 'pointer',
  },
}))

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export default function Header() {
  const loggedInUser = useSelector((state) => state.user.current)
  const dispatch = useDispatch()
  const isLoggedIn = !!loggedInUser.id
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(MODE.LOGIN)
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogoutClick = () => {
    const action = logout()
    dispatch(action)

    // ! click logout will close Menu component
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <AdbIcon className={classes.menuButton} />

          <Typography variant='h6' className={classes.title}>
            <Link href='/' color='inherit'>
              SHOP DEMO
            </Link>
          </Typography>

          {!isLoggedIn && (
            <Button color='inherit' onClick={handleClickOpen}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton color='inherit' onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      {/*  dialog => show hide onClick button login or register */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Close className={classes.closeButton} onClick={handleClose} />

        <DialogContent>
          {/* component Register */}

          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
