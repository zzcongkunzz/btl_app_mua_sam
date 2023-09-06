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
