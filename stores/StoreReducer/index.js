import {
    createSlice,
} from "@reduxjs/toolkit";
import {initStoreReducer} from "./initStoreReducer";

export const storeSlice = createSlice({
    name: 'store',
    initialState: (initStoreReducer),
    reducers: {
        setPageIndex: {
            reducer: (state, action) => {
                // console.log("state", state);
                state.pageIndex = action.payload;
                // console.log(current(state));
            }
        },
        setAccessToken: {
            reducer: (state, action) => {
                // console.log("state", state);
                state.ACCESS_TOKEN = action.payload;
                // console.log(current(state));
            }
        },
        setUser: {
            reducer: (state, action) => {
                // console.log("state", state);
                state.user = action.payload;
                // console.log(current(state));
            }
        },
        setCriteria: {
            reducer: (state, action) => {
                // console.log("state", state);
                state.criteria = action.payload;
                // console.log(current(state));
            }
        },
        setListProduct: {
            reducer: (state, action) => {
                // console.log("state", state);
                state.listProduct = action.payload;
                // console.log(current(state));
            }
        },
        setListCart: {
            reducer: (state, action) => {
                // console.log("state", state);
                state.listCart = action.payload;
                // console.log(current(state));
            }
        },
        setCartNotication: {
            reducer: (state, action) => {
                // console.log("state", state);
                state.cartNotication = action.payload;
                // console.log(current(state));
            }
        },
        nextPage: {
            reducer: (state, action) => {
                // console.log("state", state);
                const newPageHistory = state.pageHistory;
                newPageHistory.push(action.payload);
                state.pageHistory = newPageHistory;
                // console.log(current(state));
            }
        },
        backPage: {
            reducer: (state, action) => {
                // console.log("state", state);
                const newPageHistory = state.pageHistory;
                newPageHistory.pop();
                state.pageHistory = newPageHistory;
                // console.log(current(state));
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher((action) => action.type.includes('store'),
                (state, action) => {
                    let data = { ...state };

                })
            .addDefaultCase((state, action) => {

            })
    }
})

const StoreReducer = storeSlice.reducer
export default StoreReducer
