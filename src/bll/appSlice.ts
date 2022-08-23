import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContactType} from "./contactSlice";

const slice = createSlice({
    name: 'app',
    initialState: {
        idAuth: true,
        isLoading: false,
        modalForm: {
            isOpen: false,
        },
        modalInfo: {
            isModalInfoOpen: false,
        },

    } as InitialStateType,
    reducers: {
        setIsLoading(state, action: PayloadAction<{ loading: boolean }>) {
            state.isLoading = action.payload.loading;
        },
        setModalFormOpen(state, action: PayloadAction<{ isOpen: boolean, title: string, modalData?: ContactType }>) {
            state.modalForm = {...action.payload};
        },
        setModalInfoOpen(state, action: PayloadAction<{isModalInfoOpen: boolean, modalData: ContactType }>) {
            state.modalInfo = {...action.payload};
        },
    },
});

type InitialStateType = {
    idAuth: boolean
    isLoading: boolean
    modalForm: {
        isOpen: boolean
        title: string
        modalData?: ContactType
    }
    modalInfo: ModalInfoType
};

export type ModalInfoType = {
    isModalInfoOpen: boolean,
    modalData?: ContactType
}

export const appSlice = slice.reducer;
export const {setIsLoading, setModalFormOpen, setModalInfoOpen} = slice.actions;
