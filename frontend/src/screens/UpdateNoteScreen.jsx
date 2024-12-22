import React, { useEffect, useState } from 'react'
import { Box, Button, InputAdornment, styled, TextField } from '@mui/material'
import { FaCloudUploadAlt, FaPen } from 'react-icons/fa'
import { FaFilePen } from "react-icons/fa6";
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useSingleNoteQuery, useUpdateNoteMutation } from '../slices/notesApiSlice'


const UpdateNoteScreen = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [coverImage, setCoverImage] = useState('');
    const [showCoverImage, setShowCoverImage] = useState('');

    const params = useParams();

    const { data, isSuccess } = useSingleNoteQuery(params.id);
    const [updateNote] = useUpdateNoteMutation();


    useEffect(() => {
        if (isSuccess) {
            setTitle(data?.title || '')
            setNote(data?.note || '')
            setCoverImage(data?.coverImage ? data?.coverImage : '')
            setShowCoverImage(data?.coverImage ? `/api/uploads/default/${data?.coverImage}` : '/vite.svg')

        }
    }, [data?.title, data?.note, data?.coverImage, isSuccess])

    const handleInput = (e) => {
        setCoverImage(e.target.files[0])
        setShowCoverImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        const formData = new FormData();


        formData.append("title", title);
        formData.append("note", note);
        formData.append("coverImage", coverImage)

        formData.forEach((v) => {
            console.log("formdata sended...", v)
        })

        const data = {
            id:params.id,
            formData
        }
        try {
            const response = await updateNote(data).unwrap();
            toast.success(response.message)
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }

    }

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
    return (
        <>
            <Box >
                <form onSubmit={handleFormSubmission}>
                    <Box component="section" sx={{
                        height: "30vh",
                        margin: "auto",
                        borderRadius: "4px",
                        position: "relative",
                        backgroundImage: `url(${showCoverImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<FaCloudUploadAlt />}
                            sx={{
                                position: 'absolute',
                                bottom: '5%',
                                right: '2%',
                                color: "whitesmoke",
                                background: "#db7171"
                            }}
                        >
                            Upload Cover Image
                            <VisuallyHiddenInput type="file" name='coverImage' onChange={handleInput} />
                        </Button>

                    </Box>

                    <Box sx={{ m: "2rem auto auto auto" }}>

                        <TextField
                            type="text"
                            name="title"
                            id="input-with-icon-textfield1"
                            label="Note Title"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaPen />
                                    </InputAdornment>
                                ),
                            }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            size="small"
                            fullWidth
                        />



                        <TextField
                            type='text'
                            name="note"
                            id="outlined-multiline-static"
                            label="Note Description"
                            multiline
                            rows={4}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaFilePen />
                                    </InputAdornment>
                                ),
                            }}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            size={"small"}
                            fullWidth
                        />

                        <Button type="submit" variant="contained" color="primary">Update Note</Button>

                    </Box>
                </form>
            </Box>
        </>
    )
}

export default UpdateNoteScreen








// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useUpdateProfileMutation } from '../slices/usersApiSlice'

// const updateUserProfile = () => {
//     const [isEdit, setIsEdit] = useState('')

//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [mobile, setMobile] = useState('')
//     const [gender, setGender] = useState('')
//     const [profilePic, setProfilePic] = useState('')
//     const [previewProfilePic, setPreviewProfilePic] = useState('')


//     const { user } = useSelector((state) => state.auth);
//     const [updateUserProfile, { isSuccess }] = useUpdateProfileMutation();

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const token = user?.token

//     useEffect(() => {
//         if (!token) {
//             navigate('/login')
//         }
//     }, [token])


//     const { data, isLoading } = useGetUserProfileQuery(token, { skip: !token });


//     useEffect(() => {
//         if (data && !isLoading) {
//             setName(data?.user?.name)
//             setEmail(data?.user?.email)
//             setMobile(data?.user?.mobile)
//             setGender(data?.user?.gender);
//             setProfilePic(`${BASE_URL}/api/v1/static/${data?.user?.profilePic}`)
//             setPreviewProfilePic(`${BASE_URL}/api/v1/static/${data?.user?.profilePic}`)
//         }
//     }, [data, isLoading])

//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//     });


//     const handleProfilePic = (e) => {
//         setProfilePic(e.target.files[0])
//         setProfilePic(URL.createObjectURL(e.target.files[0]))
//     }

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//      
//             formData.append('name', name)
//        

//        
//             formData.append('password', password)
//     
//             formData.append('mobile', mobile)

//      
//             formData.append('gender', gender)
//         
//             formData.append('profilePic', profilePic)
//         

//         const userData = {
//             token,
//             formData
//         }

//         try {
//             const response = await updateUserProfile(userData).unwrap();

//             if (response) {
//                 toast.success(response?.message)
//                 setIsEdit(true);

//                 const updatedData = {
//                     ...user,
//                     name: response?.data?.name,
//                     profilePic: response?.data.profilePic
//                 }

//                 dispatch(setCredential(updatedData))
//             }

//         } catch (error) {
//             toast.error(error.data.message)
//         }
//     }
//     return (
//         <div className='my-6'>
//             <div className="relative">
//                 <Tooltip title="edit profile">
//                     <IconButton onClick={() => setIsEdit(!isEdit)}>
//                         <EditNoteIcon />
//                     </IconButton>
//                 </Tooltip>

//                 <form>
//                     <div>
//                         <Badge overlap="circular" anchorOrigin={{ veritcal: "bottom", horizontal: 'right' }}
//                             badgeContent={
//                                 isEdit ?
//                                     <Button component="label" role="undefined" variant="text" tabIndex={-1}
//                                         startIcon={<PhotoCameraIcon />}>
//                                         <VisuallyHiddenInput type="file" name="profilePic" onChange={handleProfilePic} />
//                                     </Button>
//                                     :
//                                     <CircleIcon />
//                             }
//                         >
//                             <Avatar alt="profilePic" src={previewProfilePic} />
//                         </Badge>
//                     </div>

//                     <div className="width">
//                         <TextField variant="outlined" type="text" name="name" id="your_name" label="Your Name" autoComplete="off" size="small" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEdit} />

//                         <TextField variant="outlined" type="email" name="email" id="your_email" label="Your email" autoComplete="off" size="small" value={email} onChange={(e) => setEmail(e.target.value)} disabled />


//                         <TextField variant="outlined" type="password" name="password" id="your_password" label="Your password" autoComplete="off" size="small" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isEdit} />



//                         <TextField variant="outlined" type="text" name="mobile" id="your_mobile" label="Your mobile" autoComplete="off" size="small" value={mobile} onChange={(e) => setMobile(e.target.value)} disabled={!isEdit} />


//                         <FormControl>
//                             <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
//                             <RadioGroup
//                                 row
//                                 aria-labelledby="demo-row-radio-buttons-group-label"
//                                 name="gender"
//                                 value={gender}
//                                 onChange={(e) => setGender(e.target.value)}
//                             >
//                                 <FormControlLabel value="Male" control={<Radio disabled={!isEdit} />} label="Male" />
//                                 <FormCotrolLabel value="Female" control={<Radio disabled={!isEdit} />} label="Female" />
//                                 <FormControlLabe value="Other" control={<Radio disabled={!isEdit} />} label="Other" />

//                             </RadioGroup>
//                         </FormControl>

//                         {
//                             isEdit && (
//                                 <Button type="submit" variant='contained'>update profile</Button>
//                             )
//                         }

//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default updateUserProfile



// // this is two of redux toolkit codes
// getUserProfile: builder.query({
//     query:(token) => ({
//         url:'/auth/my-profile',
//         method:"GET",
//         headers:{
//             'Authorization':`Bearer ${token}`,
//             'Content-Type':'application/json'
//         }
//     })
// })

// updateUserProfile: builder.mutation({
//     query:(data) => ({
//         url:'/api/profile/update',
//         method:'PUT',
//         headers:{
//             'Authorization':`Bearer ${data.token}`,
//         },
//         body:data.formData
//     }),
//     invalidatesTags:['Auth']
// })


// // route (express node js) 

// // update profile
// router.put('/update/profile', isAuthenticated,upload.single('profilePic'), updateUserProfileController );


// // controller 
// export const updateUserProfileController = async (req,res) => {
//     try {
//         const user = await User.findById(req.user) // req.user is the id 

//         if(!user){
//             return res.status(401).json({message:"No User"})
//         }

//         if(req.body.name){
//             user.name = req.body.name
//         }

//         if(req.body.password){
//             const hashedPassword = await hashPassword(req.body.password);

//             user.password = hashedPassword;
//         }


//         if(req.body.mobile){
//             user.mobile = req.body.mobile
//         }

//         if(req.body.gender){
//             user.gender = req.body.gender
//         }


//         if(req.file){
//             if(user.profilePic !== 'uploads/default.png'){
//                 fs.unlink(path.resolve(`./public/${user.profilePic}`), (err) => {
//                     if(err){
//                         console.log(err)
//                     }
//                 })
//             }

//             user.profilePic = `uploads/${req.file.filename}`;
//         }

//         const updatedUser = await user.save();

//         return res.status(200).json({
//             message:"Profile Updated",
//             user:{
//                 name:updatedUser.name,
//                 profilePic:updatedUser.profilePic,
//             }
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message:error.message
//         })
//     }
// }