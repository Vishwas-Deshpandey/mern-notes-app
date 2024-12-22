import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDeleteNoteMutation } from '../slices/notesApiSlice'

const NotesCard = ({ notes }) => {

    const [deleteNote] = useDeleteNoteMutation();
    const navigate = useNavigate()


    const handleDeleteOperation = async () => {
        try {
            const res = await deleteNote(notes._id).unwrap();
            toast.success(res?.message)
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }
    return (
        <Card sx={{ width: 240 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={notes && notes.coverImage ? `/api/uploads/default/${notes.coverImage}` : '/vite.svg'}
                title={notes.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {notes.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {notes.note}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/user/note/update/${notes._id}`)}>Edit</Button>
                <Button size="small" color="error" onClick={handleDeleteOperation}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default NotesCard


