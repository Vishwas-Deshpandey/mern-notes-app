import React from 'react'
import heroBanner from '../assets/static-images/HeroBanner.png'
import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} sx={{ pt: "2rem" }}>
            <img src={heroBanner} alt='hero banner' width={375} height={375} />
            <Typography
                variant='h5'
                component="h5"
                fontSize={38}
                fontWeight={'bolder'}
                fontFamily={'monospace'}
                color={'#db7171'}
                textAlign={'center'}>
                WELCOME TO MERN NOTES APP
            </Typography>

            <Link to="/user/create">
                <Button variant='outlined' color="primary" sx={{ my: "2rem" }}>create note</Button>
            </Link>
        </Stack>
    )
}

export default Hero