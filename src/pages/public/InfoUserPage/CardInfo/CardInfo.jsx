import React, { useState, useRef } from 'react';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UpdateAvatar from '~/components/UpdateAvatar/UpdateAvatar'
import userSlice from '~/redux/userSlice';
import ViewIamge from '~/components/ViewImage/ViewImage';
import './CardInfo.scss'
import { t } from 'i18next';
import { Button } from '@mui/material';

export default function CardInfo() {
    const user = useSelector((state) => state.user.current)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewImg, setViewImg] = useState([])
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleViewAvatar = () => {
        setViewImg([user.avatarUrl])
        handleCloseMenu();
    };

    const handleChangeAvatar = (e) => {
        e.preventDefault();
        inputRef.current.click();
        handleCloseMenu();
    }

    const handleLogout = async (e) =>{
        await dispatch(userSlice.actions.logout());
        navigate('/');
    }
    const [src, setSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // preview
    const [preview, setPreview] = useState(null);

    // modal state
    const [modalOpen, setModalOpen] = useState(false);

    // ref to control input element
    const inputRef = useRef(null);

    // handle Change
    const handleImgChange = (e) => {
        setImageFile(e.target.files[0])
        setModalOpen(true);
        inputRef.current.value = '';
    };
    return (
        <div className="col l-3" style={{ paddingTop: 60 }}>
            <UpdateAvatar
                modalOpen={modalOpen}
                imageFile={imageFile}
                setModalOpen={setModalOpen}
                setImageFile={setImageFile}
              
            />
            <input
                hidden
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImgChange}
            />
            <div className="paper card-info">
                <div className="user-info">
                    <Avatar
                        className="user-avatar"
                        alt="Cindy Baker"
                        src={user.avatarUrl}
                        onClick={handleOpenMenu}
                    />
                    <div className="user-details">
                        <h3 className="user-name">{user.userName}</h3>
                        <div className="user-email">{user.mail}</div>
                    </div>
                </div>
                <Divider />
                <div className='options-card'>
                    <a href="/myBooking" className="option">
                        <div className="option-icon">
                            <FactCheckOutlinedIcon />
                        </div>
                        {t('navbar.myBooking')}
                    </a>
                    <a href="/myBooking" className="option">
                        <div className="option-icon">
                            <WysiwygOutlinedIcon />
                        </div>
                        {t('navbar.historyBookingClient')}
                    </a>
                    <a href="/account" className="option edit-profile">
                        <div className="option-icon">
                            <SettingsOutlinedIcon />
                        </div>
                        {t('navbar.account')}
                    </a>
                    <a href="/" className="option logout" onClick={handleLogout}>
                        <div className="option-icon">
                            <LogoutOutlinedIcon />
                        </div>
                        {t('navbar.signout')}
                    </a>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleViewAvatar}>View Avatar</MenuItem>
                <MenuItem onClick={handleChangeAvatar}>Change Avatar</MenuItem>
            </Menu>
            <ViewIamge images={viewImg} setImages={setViewImg}/>
        </div>
    );
}
