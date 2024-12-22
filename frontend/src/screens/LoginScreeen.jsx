import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import {
    Button,
    TextField,
    Typography

} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const LoginScreeen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation()

    const { user } = useSelector((state) => state.auth)


    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [navigate, user])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await login({email,password}).unwrap();
            dispatch(setCredentials({...response}))
            toast.success("LoggedIn Successfully")
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <FormContainer>
            <Typography variant='h4' component="h4" sx={{ my: '12px' }}>Sign in</Typography>

            <form onSubmit={handleFormSubmit}>
                <TextField
                    type="email"
                    id="outlined-basic-1"
                    label="Enter Email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    size='small'
                    fullWidth
                    autoComplete='off'
                    sx={{ my: "12px" }}
                />


                <TextField
                    type="password"
                    id="outlined-basic-2"
                    label="Enter Password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    size='small'
                    fullWidth
                    autoComplete='off'
                    sx={{ my: "12px" }}
                />

                <Typography variant='span' component={"div"} sx={{m:"8px"}}>
                    New Customer <Link to="/register" style={{color:"dodgerBlue", textDecoration:"none"}}>Register</Link> for free
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ my: "8px" }}>
                    Login
                </Button>

            </form>

        </FormContainer>
    )
}

export default LoginScreeen