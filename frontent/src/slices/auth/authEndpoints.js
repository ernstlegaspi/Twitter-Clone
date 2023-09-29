import { apiSlice } from "../apiSlice"

const url = 'auth'

export const authEndpoint = apiSlice.injectEndpoints({
	endpoints: builder => ({
		authLogin: builder.mutation({
			query: data => ({
				url: `${url}/login`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['User']
		}),
		register: builder.mutation({
			query: data => ({
				url: `${url}/`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['User']
		})
	})
})

export const { useAuthLoginMutation, useRegisterMutation } = authEndpoint
