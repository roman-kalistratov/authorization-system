import React, { useState } from 'react'
import { Avatar, Box, Divider, Icon, IconButton, ListItemButton, ListItemText, ListSubheader, Menu, MenuItem, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { TfiUser } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../../../redux/features/userSlice';
import authApi from '../../../api/modules/auth.api';
import edit from '../../../assets/images/edit.webp';
import user from '../../../assets/images/user.webp';
import admin from '../../../assets/images/admin.jpg';
import dashboard from '../../../assets/images/dashboard.webp';
import settings from '../../../assets/images/settings.webp';
import logout from '../../../assets/images/log-out.webp';

const ProfileSection = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async (e) => {
        try {
            const rememberUser = localStorage.getItem("rememberUser");
            if (rememberUser) localStorage.removeItem("rememberUser");

            const response = await authApi.logout();
            toast.success(response);

            dispatch(setUser(null));
            navigate("/");
        } catch (err) {
            toast.error("logout error:", err);
        }
    }

    return (
        <Box sx={{ flexGrow: 0, marginLeft: { xs: "0", md: "-4rem" } }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, '&:hover': { backgroundColor: "transparent" } }}>
                {user?.role === "admin" ? (
                    <Avatar>
                        <img src={admin} alt="user avatar" width="40px" height="40px" />
                    </Avatar>
                ) : (
                    <Icon color="primary" fontSize="large">
                        {user?.picture ? <img src={user?.picture} alt="user avatar" width="35px" height="35px" style={{ "borderRadius": "50%" }} /> :
                            <TfiUser style={{ borderRadius: "50%", border: "1px solid white", padding: "2px", fontSize: "1.7rem" }} />}
                    </Icon>
                )}
                <Typography sx={{ ml: 1, display: { xs: 'none', md: 'flex' } }} textTransform="capitalize" color="primary"> {user ? `Hello ${user?.firstname || user?.given_name}` : 'account'} </Typography>
            </IconButton>

            <Menu
                sx={{ mt: '35px', }}
                anchorEl={anchorElUser}
                keepMounted
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 2.5,
                        borderRadius: 0,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            zIndex: 0,
                        },
                    },
                }}
            >

                <ListSubheader component="div" sx={{ fontWeight: 700, textAlign: "center", fontSize: "1.2rem" }}>
                    Hello <Typography component="span" fontWeight={500} color="secondary" textTransform="capitalize">{user?.firstname || user?.given_name || "User"}</Typography>
                </ListSubheader>

                <Divider />

                {(user ? settingsAuthUser : settingsUser).map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu} sx={{ width: 170 }}>
                        <ListItemButton
                            component={Link}
                            to={setting.path}
                            onClick={setting.type === "logout" ? handleLogout : null}
                            sx={{ marginY: .5, p: 0, '&:hover': { backgroundColor: "transparent" } }}
                        >
                            <img src={setting.icon} width={18} height={18} style={{ opacity: .8 }} alt="menu icon" />
                            <ListItemText sx={{ ml: 1, color: "#555" }}>
                                {setting.title}
                            </ListItemText>
                        </ListItemButton>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default ProfileSection

const settingsUser = [{
    title: "Sign Up",
    path: "/register",
    icon: edit
}, {
    title: "Log in",
    path: "/",
    icon: user
}];

const settingsAuthUser = [{
    title: "Profile",
    path: "/profile",
    icon: user
}, {
    title: "Dashboard",
    path: "/dashboard",
    icon: dashboard
}, {
    title: "Settings",
    path: "/settings",
    icon: settings
}, {
    title: "Logout",
    icon: logout,
    type: "logout"
}];