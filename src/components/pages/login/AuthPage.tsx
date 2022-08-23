import React, {useEffect} from 'react';

import {Container, Grid, Paper, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../bll/store";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../../dal/settings/env";
import {setIsLogin} from "../../../bll/authSlice";
import SnackBar from "../../common/snackBar/snackBar";


export const AuthPage: React.FC<AuthPagePropsType> = ({children, title, redirectTo}) => {
    const error = useSelector((state: AppRootStateType) => state.auth.error);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const {isLogin} = useSelector((state: AppRootStateType) => state.auth);

    useEffect(() => {
        if (isLogin) {
            navigate(PATH.PROFILE)
        }
    }, [isLogin])

    useEffect(() => {
        hydrateStateWithLockalStorage()
    }, [])

    const hydrateStateWithLockalStorage = () => {
        if (localStorage.hasOwnProperty("login")) {
            const value = localStorage.getItem("login");
            if (value) {
                const isLogin = JSON.parse(value)
                dispatch(setIsLogin({isLogin}))
            }
        }
    }
    const redirect = title === "Login" ? PATH.REGISTRATION : PATH.LOGIN

    return (
        <section>
            <Container maxWidth="lg">
                <Paper elevation={6} sx={{p: 5}}>
                    <Grid container>
                        <Grid item xs={7}>
                            <img
                                style={{maxWidth: "650px"}}
                                src="https://thumbs.dreamstime.com/b/welcome-poster-spectrum-brush-strokes-white-background-colorful-gradient-brush-design-vector-paper-illustration-r-welcome-125370796.jpg"
                                alt=""/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" component="h4" m={1}>{title}</Typography>

                            {children}

                            <p>Do not have an account?&nbsp;
                                <NavLink to={redirect}>{redirectTo}</NavLink>
                            </p>
                        </Grid>
                    </Grid>
                </Paper>
                {error && <SnackBar>{error}</SnackBar>}
            </Container>
        </section>
    );
};

type AuthPagePropsType = {
    title: string
    children: JSX.Element
    redirectTo: string
}