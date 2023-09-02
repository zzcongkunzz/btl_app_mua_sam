import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({ baseUrl: "" });
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // console.log("custom", result);

    if (result.error && result.error.status === 401) {
        // try to get a new token
    }
    // console.log("args", args);

    return result;
};

export const fakeShopeeAPI = createApi({
    // baseQuery: axiosBaseQuery({
    //     baseUrl: '',
    // }),
    baseQuery: baseQueryWithReauth,
    // tagTypes: ['Post'],
    endpoints: (build) => ({
        login: build.mutation({
            query: ({ username, password }) => {
                return {
                    url: `${appConfig.baseApiUrl}/api/v1/auth/token`,
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: {
                        username: username,
                        password: password,
                        grant_type: "password",
                    },
                };
            },
        }),

    }),
});

export const {
    useLoginMutation,
} = fakeShopeeAPI;
