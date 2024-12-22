import { Card, Container, Grid, Stack } from '@mui/material'
import React from 'react'

const FormContainer = ({ children }) => {
    return (
        <Container sx={{ width: {md:"100%" ,lg:"50%"}}}>
            <Grid container spacing={2} sx={{ display: "flex", justifyContent: { md: 'center' } }}>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    )
}

export default FormContainer