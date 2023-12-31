import { api } from "../../api/apiSlice";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserWishlist: builder.query({
            query: (userId) => `users/${userId}/wishlist`
        }),
        getUserReadingList: builder.query({
            query: (userId) => `users/${userId}/readinglist`
        })
    })
})

export const {useGetUserWishlistQuery, useGetUserReadingListQuery} = userApi;