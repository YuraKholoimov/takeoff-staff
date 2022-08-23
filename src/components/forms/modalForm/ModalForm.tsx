import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../bll/store";
import {Controller, useForm} from "react-hook-form";
import {ContactType} from "../../../bll/contactSlice";
import {setModalFormOpen} from "../../../bll/appSlice";

export const ModalForm: React.FC<ModalFormPropsType> = ({callback}) => {
    const dispatch = useAppDispatch();
    const {isOpen, title} = useSelector((state: AppRootStateType) => state.app.modalForm)
    const modalData = useSelector((state: AppRootStateType) => state.app.modalForm.modalData)

    const {
        control,
        handleSubmit,
        reset,
        setValue
    } = useForm<ContactType>();

    const handleClose = () => dispatch(setModalFormOpen({isOpen: false, title: ""}));

    useEffect(() => {
        if (modalData) {
            for (let key in modalData) {
                setValue(key as keyof ContactType, modalData[key as keyof typeof modalData])
            }
        }
    }, [modalData])

    const onSubmit = (data: ContactType) => {
        callback(data)
        reset()
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <DialogContent>
                        <Controller
                            control={control}
                            defaultValue={modalData?.first_name || ''}
                            name="first_name"
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="first_name"
                                    label="First name"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    // error
                                    // helperText="Incorrect entry."
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="last_name"
                            defaultValue={modalData?.last_name || ''}
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="last_name"
                                    label="Last name"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    // error
                                    // helperText="Incorrect entry."
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            defaultValue={modalData?.email || ''}
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="Email"
                                    label="Email"
                                    variant="standard"
                                    type="text"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    // error
                                    // helperText="Incorrect entry."
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} type={"submit"}>{modalData ? "Edit" : "Add"}</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
}

type ModalFormPropsType = {
    callback: (data: ContactType) => void
}