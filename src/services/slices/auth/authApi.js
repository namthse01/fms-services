import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/api/account/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({
            query: (accountId) => ({
                url: `/api/account/logout/accountId/${accountId}`,
                method: "PUT",
            }),
        }),
        // refreshToken: builder.mutation({
        //     query: () => ({
        //         url: "/auth/refresh",
        //         method: "POST",
        //     }),
        // }),
        register: builder.mutation({
            query: (user) => ({
                url: "/auth/register",
                method: "POST",
                body: { ...user },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    // useRefreshTokenMutation,
    useRegisterMutation,
} = authApiSlice;
