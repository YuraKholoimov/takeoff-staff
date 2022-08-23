import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FormFieldType} from "../components/forms/authForm/AuthForm";
import {auth} from '../dal/api/auth';
import {AxiosError} from "axios";


// Thunk
export const LoginThunk = createAsyncThunk("login/setIsLogin",
    async (data: FormFieldType, {dispatch}) => {
        try {
            const res = await auth.login(data)
            if (res.statusText === "OK") {
                dispatch(setIsLogin({isLogin: true}))
                localStorage.setItem("login", "true")
            } else {
                dispatch(setError(res.data.message))
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({error: error.response?.data.message}))
            }
        }
    });

export const registrationThunk = createAsyncThunk("login/registrationFormWrapper",
    async (data: FormFieldType, {dispatch}) => {
        try {
            const res = await auth.registration(data)
            console.log(res)
            if (res.statusText === "OK") {
                dispatch(setIsLogin({isLogin: true}))
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({error: error.message}))
            }
        }
    });


const slice = createSlice({
    name: 'auth',
    initialState: {
        userId: "userId1",
        isLogin: false,
        error: '',
    } as InitialStateType,
    reducers: {
        setError(state: InitialStateType, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error;
        },
        setIsLogin(state: InitialStateType, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin;
        },
    },
    extraReducers: builder => {

    },
});

export const authSlice = slice.reducer;
export const {setError, setIsLogin} = slice.actions;


// Types
type InitialStateType = {
    userId: string
    isLogin: boolean;
    error: string;
};