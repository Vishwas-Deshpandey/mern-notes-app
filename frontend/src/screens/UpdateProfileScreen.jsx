import { Avatar, Badge, Box, Button, Divider, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa';
import { FaCamera, FaEnvelope, FaKey, FaUser, FaUserGear } from "react-icons/fa6";
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { useProfileQuery } from '../slices/usersApiSlice';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'

const UpdateProfileScreen = () => {
    
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [profilePic, setProfilePic] = useState('')
    const [showPic, setShowPic] = useState('')
    
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);
    const { data } = useProfileQuery()
    const [updateProfile ] = useUpdateProfileMutation();
    
    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setPhone(data?.phone || '')
        setShowPic(`/api/uploads/default/${user.profilePic}`)
        setProfilePic(`/api/uploads/default/${user.profilePic}`)

    }, [user.setName, user.setEmail, user.setPhone, user?.setProfilePic, data])


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleInputChange = (e) => {
        setProfilePic(e.target.files[0]);
        setShowPic(URL.createObjectURL(e.target.files[0]))
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email)
        formData.append("password", password)
        formData.append("phone", phone)
        formData.append("profilePic", profilePic)

        try {
            const response = await updateProfile(formData).unwrap();
            dispatch(setCredentials({...response}))
            toast.success("Profile Updated Successfully")
        } catch (err) {
            toast.error(err.data.message || err.message)
        }
    }
    return (
        <>
            <Box>
                <Typography variant="h5" component="div" sx={{ my: "5px" }}>
                    <FaUserGear fontSize={'28px'} style={{ marginRight: "10px" }} />
                    {user.name}
                </Typography>
                <Divider />
            </Box>

            <form onSubmit={handleFormSubmission}>
                <Box>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        sx={{
                            mt: "1rem",
                            ml: "40%"
                        }}
                        badgeContent={
                            <Button
                                component="label"
                                role={undefined}
                                variant="text"
                                tabIndex={-1}
                                startIcon={<FaCamera color="silver" />}
                                sx={{
                                    color: "whitesmoke"
                                }}
                            >

                                <VisuallyHiddenInput type="file" name='profilePic' onChange={handleInputChange} />
                            </Button>
                        }
                    >
                        <Avatar alt={name} src={showPic} sx={{ width: "75px", height: "75px" }} />
                    </Badge>



                    <Box sx={{ m: "2rem auto auto auto" }}>

                        <TextField
                            type="text"
                            name='name'
                            id="input-with-icon-textfield1"
                            label="Enter Your Full Name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaUser />
                                    </InputAdornment>
                                ),
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            fullWidth
                        />

                        <TextField
                            type="email"
                            name='email'
                            id="input-with-icon-textfield2"
                            label="Enter Your Email Id"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaEnvelope />
                                    </InputAdornment>
                                ),
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            fullWidth
                        />

                        <TextField
                            type="password"
                            name='password'
                            id="input-with-icon-textfield3"
                            label="Enter Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaKey />
                                    </InputAdornment>
                                ),
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            fullWidth
                        />

                        <TextField
                            type="number"
                            name='phone'
                            id="input-with-icon-textfield4"
                            label="Enter Your Mobile Number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaPhoneAlt />
                                    </InputAdornment>
                                ),
                            }}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            fullWidth
                        />

                        <Button type="submit" variant="contained" color="success">update my Profile</Button>
                    </Box>

                </Box>
            </form>
        </>
    )
}

export default UpdateProfileScreen