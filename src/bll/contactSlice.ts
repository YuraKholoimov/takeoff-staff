import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from "axios";
import {contacts} from "../dal/api/contacts";
import {setIsLoading, setModalInfoOpen} from './appSlice';
import {AppRootStateType} from "./store";
import {v1} from 'uuid';

// Thunk
export const setContactThunk = createAsyncThunk(
    "contacts/setContacts",
    async (userId: string, {dispatch, getState}) => {
        try {
            dispatch(setIsLoading({loading: true}))
            const {data} = await contacts.getContacts()

            return data;

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error)
            }
        } finally {
            dispatch(setIsLoading({loading: false}))
        }
    });

export const addNewContact = createAsyncThunk(
    'contacts/addNewContact',
    async (param: ContactType, {dispatch, getState}) => {
        const auth = getState() as AppRootStateType
        try {
            console.log(param)
            const contactID: string = v1();
            await contacts.addNewContact({id: contactID, ...param});
            dispatch(setContactThunk(auth.auth.userId));
        } catch (err) {
            const error = err as AxiosError;
        } finally {
            dispatch(setIsLoading({loading: false}));
        }
    },
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id: string, {dispatch, getState}) => {
        const auth = getState() as AppRootStateType
        try {
            await contacts.deleteContact(id)
            dispatch(setContactThunk(auth.auth.userId));
            dispatch(setModalInfoOpen({
                isModalInfoOpen: false,
                modalData: {id: "", first_name: '', last_name: '', email: ''}
            }))
        } catch (error) {

        }
    })

export const updateContact = createAsyncThunk(
    "contacts/updateContact",
    async (params: { id: string, first_name: string, last_name: string, email: string }, {dispatch, getState}) => {
        const auth = getState() as AppRootStateType
        try {
            await contacts.updateContact(params.id, params.first_name, params.last_name, params.email)
            dispatch(setContactThunk(auth.auth.userId));
        } catch (error) {
            console.log(error)
        }
    }
)

export const searchContact = createAsyncThunk(
    "contacts/searchContact",
    async (searchValue: string, {dispatch, getState}) => {
        const auth = getState() as AppRootStateType

        try {
            if (searchValue) {
                const res = await contacts.searchContactByName(searchValue)
                if (res.data.length) {
                    return res.data

                } else {
                    const res = await contacts.searchContactByLastName(searchValue)
                    return res.data
                }
            } else {
                dispatch(setContactThunk(auth.auth.userId));
            }
        } catch (e) {
            console.log(e)
        }
    }
)


const slice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: []
    } as InitialStateType,
    reducers: {
        // addContactsToState(state: InitialStateType, action: PayloadAction<{ newContact: ContactType }>) {
        //     state.contacts.unshift(action.payload.newContact);
        // }
    },
    extraReducers: builder => {
        builder.addCase(setContactThunk.fulfilled, (state, action) => {
            state.contacts = action.payload
        });
        builder.addCase(searchContact.fulfilled, (state, action) => {
            state.contacts = action.payload
        });
    },
});

export const contactSlice = slice.reducer;
// export const {setContactsToState} = slice.actions;


// Types
export type InitialStateType = {
    contacts: ContactType[]

};

export type ContactType = {
    id?: string,
    first_name: string,
    last_name: string,
    email: string,
}