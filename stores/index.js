import {configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import StoreReducer from "./StoreReducer";
import {fakeShopeeAPI} from "./API/service";


export const store = configureStore({
    reducer: {
        StoreReducer: StoreReducer,
        [fakeShopeeAPI.reducerPath]: fakeShopeeAPI.reducer
    },
    // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fakeShopeeAPI.middleware)
})

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch)
