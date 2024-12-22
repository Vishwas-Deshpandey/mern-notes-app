import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import {
    Button,
    TextField,
    Typography

} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [register, { isLoading }] = useRegisterMutation();


    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords Does Not Matched")
        } else {
            try {
                const response = await register({ name, email, password, phone }).unwrap();
                dispatch(setCredentials({ ...response }))
                toast.success("Registered Successfully");
                navigate("/")
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        }


    }

    return (
        <FormContainer>
            <Typography variant='h4' component="h4" sx={{ my: '12px' }}>Register </Typography>

            <form onSubmit={handleFormSubmit} >

                <TextField
                    type="text"
                    id="outlined-basic-1"
                    label="Enter Name"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    size='small'
                    fullWidth
                    autoComplete='off'
                    sx={{ my: "12px" }}
                />

                <TextField
                    type="email"
                    id="outlined-basic-2"
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
                    id="outlined-basic-3"
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

                <TextField
                    type="password"
                    id="outlined-basic-4"
                    label="Confirm Password"
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    size='small'
                    fullWidth
                    autoComplete='off'
                    sx={{ my: "12px" }}
                />

                <TextField
                    type="number"
                    id="outlined-basic-5"
                    label="Enter Phone Number"
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                    size='small'
                    fullWidth
                    autoComplete='off'
                    sx={{ my: "12px" }}
                />

                <Typography variant='span' component={"div"} sx={{ m: "8px" }}>
                    Already Have an Account <Link to="/login" style={{ color: "dodgerBlue", textDecoration: "none" }}>Login</Link> for free
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ my: "8px" }}>
                    Register
                </Button>

            </form>

        </FormContainer>
    )
}

export default RegisterScreen