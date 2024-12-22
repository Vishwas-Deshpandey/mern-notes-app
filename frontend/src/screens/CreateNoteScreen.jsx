import React, { useState } from 'react'
import { Box, Button, InputAdornment, styled, TextField } from '@mui/material'
import { FaCloudUploadAlt, FaEnvelope, FaPen } from 'react-icons/fa'
import { FaFilePen } from "react-icons/fa6";
import { toast } from 'react-toastify'
import { useCreateMutation } from '../slices/notesApiSlice'


const CreateNoteScreen = () => {


    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [coverImage, setCoverImage] = useState('');
    const [showCoverImage, setShowCoverImage] = useState('/vite.svg');
    const [create] = useCreateMutation()

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

        try {
            const response = await create(formData).unwrap();

            toast.success(response?.message)
            setTitle("")
            setNote("")
            setCoverImage("")
            setShowCoverImage("/vite.svg")
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
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            size="small"
                            fullWidth
                        />



                        <TextField
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
                            name="note"
                            onChange={(e) => setNote(e.target.value)}
                            variant="outlined"
                            sx={{ my: "10px" }}
                            size={"small"}
                            fullWidth
                        />


                        <Button type="submit" variant="contained" color="primary">Add New Note</Button>


                    </Box>
                </form>
            </Box>

        </>
    )
}

export default CreateNoteScreen