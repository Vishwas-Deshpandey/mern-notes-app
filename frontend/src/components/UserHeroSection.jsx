import { Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotesCard from './Card'
import { useGetAllNotesQuery } from '../slices/notesApiSlice'

const UserHeroSection = () => {
    const [search, setSearch] = useState('')

    const { data, isSuccess } = useGetAllNotesQuery();

    return (
        <>

            <TextField variant='outlined' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='type to search' size='small' sx={{ my: "1.75rem", background: "whitesmoke" }} fullWidth />

            <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'left'} gap={'3rem'}>
                {
                    isSuccess && (

                        data.slice(0, 5).map((c, i) => (
                            <NotesCard key={i} notes={c}/>
                        ))
                    )
                }
            </Stack>
        </>
    )
}

export default UserHeroSection