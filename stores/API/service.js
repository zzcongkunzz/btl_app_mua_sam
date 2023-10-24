import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({ baseUrl: "" });

const localhost = "192.168.1.9";
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
            query: ({ phoneNumber, password }) => {
                console.log("phoneNumber", phoneNumber)
                console.log("password", password)
                return {
                    url: `http://${localhost}:8099/adm/api/auth/login`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        phoneNumber: phoneNumber,
                        password: password,
                    },
                };
            },
        }),
        register: build.mutation({
            query: ({ fullName, phoneNumber, password, email }) => {
                return {
                    url: `http://${localhost}:8099/adm/api/user`,
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: {
                        fullName,
                        phoneNumber,
                        password,
                        email,
                    },
                };
            },
        }),
        updateUser: build.mutation({
            query: ({ user }) => {
                return {
                    url: `http://${localhost}:8099/adm/api/user`,
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: {
                        users: user,
                    },
                };
            },
        }),
        findProductByCriteria: build.mutation({
            query: ({ nameProductOrCategory, category, sortBy}) => {
                return {
                    url: `http://${localhost}:8099/adm/api/product/findByCriteria`,
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: {
                        nameProductOrCategory,
                        category,
                        sortBy,
                    },
                };
            },
        }),
        findProductById: build.mutation({
            query: ({ id}) => {
                return {
                    url: `http://${localhost}:8099/adm/api/product/${id}`,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                };
            },
        }),
        getCategory: build.mutation({
            query: () => {
                return {
                    url: `http://${localhost}:8099/adm/api/category`,
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                };
            },
        }),
        addCart: build.mutation({
            query: ({user, product, quantity}) => {
                return {
                    url: `http://${localhost}:8099/adm/api/cart`,
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: {
                        user,
                        product,
                        quantity,
                    },
                };
            },
        }),
        getCartByUser: build.mutation({
            query: ({user}) => {
                return {
                    url: `http://${localhost}:8099/adm/api/cart/getCart`,
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: {
                        user,
                    },
                };
            },
        }),
        updateCart: build.mutation({
            query: ({cart}) => {
                return {
                    url: `http://${localhost}:8099/adm/api/cart`,
                    method: "PUT",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: {
                        cart
                    },
                };
            },
        }),
        deleteCart: build.mutation({
            query: ({id}) => {
                return {
                    url: `http://${localhost}:8099/adm/api/cart/${id}`,
                    method: "DELETE",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useFindProductByCriteriaMutation,
    useFindProductByIdMutation,
    useGetCategoryMutation,
    useAddCartMutation,
    useGetCartByUserMutation,
    useUpdateCartMutation,
    useDeleteCartMutation,

} = fakeShopeeAPI;
