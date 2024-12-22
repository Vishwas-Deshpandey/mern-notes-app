import { apiSlice } from './apiSlice'

const NOTES_URL = '/api/notes';


export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: `${NOTES_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["User", "Notes"]
        }),
        getAllNotes: builder.query({
            query: () => ({
                url: `${NOTES_URL}/all-notes`,
                method: "GET"
            }),
            providesTags: ["User", "Notes"]
        }),
        singleNote: builder.query({
            query: (id) => ({
                url: `${NOTES_URL}/note/${id}`,
                method: "GET"
            }),
            providesTags: ["User", "Notes"]
        }),
        updateNote: builder.mutation({
            query: (data) => {
                  console.log(data)
                return {
                    url: `${NOTES_URL}/note/${data.id}`,
                    method: "PUT",
                    body: data.formData
                }
            },
            invalidatesTags: ["User", "Notes"]
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `${NOTES_URL}/note/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User", "Notes"]
        })
    })
})


export const { useCreateMutation, useGetAllNotesQuery, useSingleNoteQuery, useUpdateNoteMutation, useDeleteNoteMutation } = notesApiSlice