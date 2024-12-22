import React from 'react'
import NotesCard from '../components/Card'
import { Stack } from '@mui/material'
import { useGetAllNotesQuery } from '../slices/notesApiSlice'

const MyNotesScreen = () => {
    const { data, isSuccess } = useGetAllNotesQuery();

    return (
        <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'left'} gap={'3rem'}>
            {
                isSuccess && (
                    data.map((c, i) => (
                        <NotesCard key={i} notes={c}/>
                    ))
                )
            }
        </Stack>
    )
}

export default MyNotesScreen