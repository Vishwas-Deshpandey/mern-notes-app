import React from 'react'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import { FaBookOpen, FaPen, FaUser } from 'react-icons/fa'
import { FaUserGear } from "react-icons/fa6";

import { NavLink } from 'react-router-dom'

const UserNavigations = () => {
    return (
        <List>
            <NavLink to='/user/notes'>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FaBookOpen fontSize={22} />
                        </ListItemIcon>
                        <ListItemText primary={"My Notes"} />
                    </ListItemButton>
                </ListItem>
            </NavLink>

            <NavLink to={'/user/create'}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FaPen fontSize={22} />
                        </ListItemIcon>
                        <ListItemText primary={"Add New Note"} />
                    </ListItemButton>
                </ListItem>
            </NavLink>

            <NavLink to={'/user/update/profile'}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FaUserGear fontSize={22} />
                        </ListItemIcon>
                        <ListItemText primary={"My Profile"} />
                    </ListItemButton>
                </ListItem>
            </NavLink>

            <NavLink to={'/user'}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FaUser fontSize={22} />
                        </ListItemIcon>
                        <ListItemText primary={"My Dashboard"} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
        </List>
    )
}

export default UserNavigations