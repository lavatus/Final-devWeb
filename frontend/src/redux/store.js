import { configureStore, combineReducers} from "@reduxjs/toolkit";


import {persistStore,persistReducer, FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {UserSlice, 
        ProfileSlice,
        ForgotPasswordSlice
      } from "./Slice/userSlice";

import {productsSlide, productSlice} from "./Slice/productSlice";

import {cartSlice} from './Slice/cartSlice'
import { myOrderSlice, newOrderSlice, getOrderDetailSlice } from "./Slice/orderSlice";


const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    user: UserSlice.reducer,
    userProfile: ProfileSlice.reducer,
    forgotPassword: ForgotPasswordSlice.reducer,

    products: productsSlide.reducer,
    product: productSlice.reducer, 

    cart: cartSlice.reducer,

    newOrder: newOrderSlice.reducer,
    myOrders: myOrderSlice.reducer,
    getOrder: getOrderDetailSlice.reducer
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store =  configureStore({

    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)
