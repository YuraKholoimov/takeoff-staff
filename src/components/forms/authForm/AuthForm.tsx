import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Paper, TextField} from "@mui/material";
import * as Yup from 'yup';
import {AsyncThunk} from "@reduxjs/toolkit";
import {yupResolver} from "@hookform/resolvers/yup";
import {AppRootStateType, useAppDispatch} from "../../../bll/store";
import {useSelector} from "react-redux";

export type FormFieldType = {
    email: string
    password: string
}


export const AuthForm: React.FC<AuthFormPropsType> = (
    {buttonName, callback}
) => {
    const error = useSelector((state: AppRootStateType) => state.auth.error);
    const dispatch = useAppDispatch();

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email address is required')
            .email('Please enter valid email'),
        password: Yup.string()
            .required('password is required')
            .min(6, 'password must be at 6 char long'),
    });

    const {
        control,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm<FormFieldType>({
        mode: "all",
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data: FormFieldType) => {
        dispatch(callback(data))
        reset()
    };

    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '95%'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Controller
                        control={control}
                        name="email"
                        render={({field: {onChange, onBlur, value, ref}}) => (
                            <TextField
                                id="filled-basic"
                                size={"small"}
                                label="email"
                                variant="outlined"
                                fullWidth={true}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={!!errors.email?.message}
                                // helperText={errors.email?.message}
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({field: {onChange, onBlur, value, ref}}) => (
                            <TextField
                                id="filled-basic"
                                size={"small"}
                                label="Password"
                                variant="outlined"
                                fullWidth={true}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                type={"password"}
                                error={!!errors.password?.message}
                                helperText={errors.password?.message}
                                required
                            />
                        )}
                    />
                </Box>
                <Button type="submit" variant={"contained"} fullWidth={true}
                        sx={{m: 1, width: '95%'}}>{buttonName}</Button>
            </form>
        </Paper>
    );
}

export type AuthFormPropsType = {
    buttonName: string
    callback: AsyncThunk<void, FormFieldType, {}>;
}