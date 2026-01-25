import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../Features/api/AuthApi'
import authSlice from '../Features/slice/authSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { dashboardDataApi } from '../Features/api/DashboardDataApi';
import { userApi } from '../Features/api/UserApi';
import { FeedsApi } from '../Features/api/FeedApi';
import {BookingApi}from '../Features/api/BookingApi'
import { PaymentsApi } from '../Features/api/PaymentsApi';
import SupportTicketApi from '../Features/api/SupportTicketApi';
import ReportsApi from '../Features/api/ReportsApi';
// import { staffApi } from '../Features/api/StaffApi';



// configure the Redux store
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'isAuthenticated', 'user'], // only persist these keys
};

//configure cart slice for persistence
// const cartPersistConfig = {
//     key: 'cart',
//     storage,
//     whitelist: ['items', 'totalPrice'], // only persist these keys
// };

//Create the  persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

// const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
    reducer: {
        // Add the AuthApi reducer
        [AuthApi.reducerPath]: AuthApi.reducer,
        [dashboardDataApi.reducerPath]: dashboardDataApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [FeedsApi.reducerPath]:FeedsApi.reducer,
        [BookingApi.reducerPath]:BookingApi.reducer,
        [PaymentsApi.reducerPath]:PaymentsApi.reducer,
        [SupportTicketApi.reducerPath]:SupportTicketApi.reducer,
        [ ReportsApi.reducerPath]: ReportsApi.reducer,
        // [staffApi.reducerPath]: staffApi.reducer,
    
        //add the auth slice reducer
        authSlice: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            AuthApi.middleware,
            dashboardDataApi.middleware,
            userApi.middleware,
            FeedsApi.middleware,
            BookingApi.middleware,
            PaymentsApi.middleware,
            SupportTicketApi.middleware,
            ReportsApi.middleware
            // staffApi.middleware
        ),
})


//export the persisted store
export const persistor = persistStore(store)



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch