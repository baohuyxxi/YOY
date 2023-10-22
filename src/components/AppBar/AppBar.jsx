/* eslint-disable react/jsx-no-undef */
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { NavLink } from 'react-router-dom'
import logoYoy from '~/assets/imageMaster/logo.png'
import ModeToggle from '../ModeToggle/ModeToggle'
import DropdownUser from '../DropdownUser/DropdownUser'
import LanguageSelect from '../LanguageSelected/LanguageSelected'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import SignInSignUp from '../SignIn-SignUp/SignIn-SignUp'
import { AuthContext } from '~/contexts/AuthContext'
import { useContext } from 'react'
import { IconButton, Paper } from '@mui/material'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { t } from 'i18next'
import './AppBar.scss'


export default function NavBar() {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const { userCurrent } = useContext(AuthContext);
  return (
    <Paper>
      <AppBar position="fixed" className='appbar' color='mainColor' >
        <Toolbar>
          <div className="logo">
            <NavLink to="/" >
              <img src={logoYoy} alt="company logo" className="logo-bg" />
            </NavLink>
          </div>
          <ModeToggle />
          <LanguageSelect />

          {
            !userCurrent ?
              <Button onClick={handleClickOpen} startIcon={<AccountCircle />}>
                {t('title.signin')}
              </Button>
              : (
                <>
                  <IconButton>
                    <Badge badgeContent={4} color="primary">
                    <MailIcon color="action" />
                  </Badge>
                  </IconButton>

                  <DropdownUser /></>)
          }

          {open && (
            <SignInSignUp
              value={1}
              title={t('title.signin') + "/" + t('title.signup')}
              open={open}
              onClose={handleClose}
            />
          )}
        </Toolbar>
      </AppBar>
    </Paper>

  )
}


