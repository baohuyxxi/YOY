import React, { useState } from 'react';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Paper from '@mui/material/Paper';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { t } from 'i18next';

export default function CardInfo() {
  const { userCurrent, setUserCurrent, setAccessToken, setRefreshToken } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewAvatar = () => {

    handleCloseMenu();
    // Thực hiện hành động xem avatar
  };

  const handleChangeAvatar = () => {
    handleCloseMenu();
    // Thực hiện hành động thay đổi avatar
  };

  return (
    <div className="col l-3" style={{ paddingTop: 0 }}>
      <Paper className="card-info">
        <div className="user-info">
          <Avatar
            className="user-avatar"
            alt="Cindy Baker"
            src={userCurrent.avatarUrl}
            onClick={handleOpenMenu}
          />
          <div className="user-details">
            <h3 className="user-name">{userCurrent.userName}</h3>
            <div className="user-email">{userCurrent.mail}</div>
          </div>
        </div>
        <Divider />
        <div>
          <a href="/link-my-cart" className="user-link">
            <div className="link-icon">
              <FactCheckOutlinedIcon />
            </div>
            {t('navbar.myBooking')}
          </a>
          <a href="/link-my-cart" className="user-link">
            <div className="link-icon">
              <WysiwygOutlinedIcon />
            </div>
            {t('navbar.historyBookingClient')}
          </a>
          <a href="/account" className="user-link edit-profile">
            <div className="link-icon">
              <SettingsOutlinedIcon />
            </div>
            {t('navbar.account')}
          </a>
          <a href="/" className="user-link logout">
            <div className="link-icon">
              <LogoutOutlinedIcon />
            </div>
            {t('navbar.signout')}
          </a>
        </div>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleViewAvatar}>View Avatar</MenuItem>
        <MenuItem onClick={handleChangeAvatar}>Change Avatar</MenuItem>
      </Menu>
    </div>
  );
}