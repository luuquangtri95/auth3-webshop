import { Badge, Box, IconButton, Link } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons'
import AdbIcon from '@material-ui/icons/Adb'
import Login from 'features/Auth/components/Login'
import Register from 'features/Auth/components/Register'
import { logout } from 'features/Auth/userSlice'
import { hideMiniCart } from 'features/Cart/cartSlice'
import MiniCart from 'components/MiniCart'
import { cartItemCountSelector } from 'features/Cart/selectors'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

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
  iconCart: {
    position: 'relative',
  },
  miniCart: {
    width: '300px',
    height: 'auto',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: '#fff',
    right: '20%',
  },
}))

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export default function Header() {
  const loggedInUser = useSelector((state) => state.user.current)
  const cartItemCount = useSelector(cartItemCountSelector)
  const showMiniCart = useSelector((state) => state.cart.showMiniCart)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()
  const isLoggedIn = !!loggedInUser.id
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(MODE.LOGIN)
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const history = useHistory()
  const elementRef = useRef(null)

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

  const handleCartClick = () => {
    history.push('/cart')
  }

  useEffect(() => {
    const handleMiniCart = (e) => {
      if (!elementRef.current.contains(e.target)) {
        dispatch(hideMiniCart())
      }
    }

    window.addEventListener('click', handleMiniCart)

    return () => {
      window.removeEventListener('click', handleMiniCart)
    }
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <AdbIcon className={classes.menuButton} />

          <Typography variant='h6' className={classes.title}>
            <Link
              onClick={() => history.push('/')}
              color='inherit'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
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

          <Box className={classes.iconCart}>
            <IconButton color='inherit' onClick={handleCartClick}>
              <Badge badgeContent={cartItemCount} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* mini cart */}

            {showMiniCart && (
              <Box className={classes.miniCart} ref={elementRef} boxShadow={3}>
                <Box component='ul' padding={0}>
                  {cartItems.map((x) => (
                    <MiniCart key={x.id} cartItem={x} />
                  ))}
                </Box>

                <Box textAlign='center'>
                  <Button variant='text' color='primary' onClick={handleCartClick}>
                    Tới Giỏ Hàng
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
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
