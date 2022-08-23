import React from 'react';
import {Route, Routes, useParams} from "react-router-dom";
import {AuthPage} from "./components/pages/login/AuthPage";
import {PATH} from "./dal/settings/env";

import s from './styles/App.module.scss';
import Profile from "./components/pages/profile/Profile";
import {AuthForm} from "./components/forms/authForm/AuthForm";
import {LoginThunk, registrationThunk} from './bll/authSlice';



function App() {
    return (
        <main className={s.App}>
            <Routes>
                <Route path={PATH.PROFILE}
                       element={<Profile/>}>
                    <Route path=':profileId' element={<div>Profile</div>}/>
                </Route>
                <Route path={PATH.LOGIN} element={
                    <AuthPage title={"Login"} redirectTo={"Registration"} children={
                        <AuthForm buttonName={"Login"} callback={LoginThunk}/>}
                    />}
                />
                <Route path={PATH.REGISTRATION} element={
                    <AuthPage title={"Registration"} redirectTo={"Login"} children={
                        <AuthForm buttonName={"Registration"} callback={registrationThunk}/>}
                    />}
                />
            </Routes>
        </main>
    );
}

export default App;
