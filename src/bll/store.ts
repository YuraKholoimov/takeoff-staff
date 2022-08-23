import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {authSlice} from "./authSlice";
import thunkMiddleware from 'redux-thunk';
import {useDispatch} from "react-redux";
import {contactSlice} from "./contactSlice";
import {appSlice} from "./appSlice";

// let preloadedState;
// let storage = localStorage.getItem('login')
// if (storage) preloadedState = JSON.parse(storage)

const rootReducer = combineReducers({
    app: appSlice,
    auth: authSlice,
    contacts: contactSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
    // preloadedState
})

// store.subscribe(() => {
//     const state = store.getState().auth.isLogin
//     localStorage.setItem("login", JSON.stringify(state))
// })


export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

