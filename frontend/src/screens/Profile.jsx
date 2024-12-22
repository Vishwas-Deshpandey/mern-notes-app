import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Box,
    Container,
    Grid,
    Typography,
} from '@mui/material'
import UserNavigations from '../components/UserNavigations'
import { Outlet } from 'react-router-dom'



const Profile = () => {


    return (
        <Container sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>

                {/* user navigation routes */}
                <Grid item xs={3}>
                    <UserNavigations />
                </Grid>


                {/* user side section */}
                <Grid item xs={9} >
                    <Box>
                        <Outlet />
                    </Box>
                </Grid>

            </Grid>
        </Container>
    )
}

export default Profile