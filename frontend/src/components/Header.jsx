import React, { useState } from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Tooltip,
    MenuItem,
} from '@mui/material'
import { FaNoteSticky } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth);
    const [logoutApiCall, { isLoading }] = useLogoutMutation();



    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleProfileNavigation = async () => {
        setAnchorElUser(null)
        navigate('/user')
    }



    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();

            dispatch(logout());

            setAnchorElUser(null);
            toast.success("LoggedOut SuccessFully")
            navigate('/login')

        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }


    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: "#db7171" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <FaNoteSticky style={{ marginRight: "1rem", fontSize: "28px", color: "#ffc41c" }} />
                        <Link to="/">
                            <Typography
                                variant='h6'
                                noWrap
                                component="div"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                NOTES APP
                            </Typography>
                        </Link>


                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            NOTES APP
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
                            {
                                user ? (
                                    <Box>
                                        <Tooltip title={`${user.name}'profile`}>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt={user.name} src={user.profilePic ? `/api/uploads/default/${user.profilePic}` : '/vite.svg'} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >

                                            <MenuItem onClick={handleProfileNavigation}>
                                                <Typography textAlign="center">My Account</Typography>
                                            </MenuItem>

                                            <MenuItem onClick={handleLogout}>
                                                <Typography textAlign="center">Logout</Typography>
                                            </MenuItem>

                                        </Menu>
                                    </Box>
                                ) : (
                                    <>
                                        <NavLink to="/login">
                                            <IconButton
                                                size="medium"
                                                color="inherit"
                                            >
                                                <FaSignInAlt color='black' />
                                            </IconButton>
                                        </NavLink>
                                    </>

                                )
                            }

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header