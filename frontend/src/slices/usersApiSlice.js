import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags:["User","Notes"]

        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            }),
            invalidatesTags:["User","Notes"]

        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
            invalidatesTags:["User","Notes"]

        }),
        profile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: "GET"
            }),
            providesTags:["User","Notes"]
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data
            }),
            invalidatesTags:["User","Notes"]

        })
    })
})


export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useProfileQuery, useUpdateProfileMutation } = usersApiSlice;