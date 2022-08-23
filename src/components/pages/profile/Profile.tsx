import * as React from 'react';
import {useEffect} from 'react';
import {Container} from "@mui/material";
import ButtonAppBar from "../../appBar/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from '../../../dal/settings/env';
import {addNewContact, ContactType, setContactThunk, updateContact} from "../../../bll/contactSlice";
import {Card} from "../../common/card/Card";
import {ModalForm} from "../../forms/modalForm/ModalForm";
import {ModalInfo} from "../../common/modalInfo/modalInfo";
import IconButton from "@mui/material/IconButton";
import {PreLoader} from "../../common/preLoader/PreLoader";

export default function Profile() {
    const dispatch = useDispatch<any>();
    const {isLogin, userId} = useSelector((state: AppRootStateType) => state.auth);
    const contacts = useSelector((state: AppRootStateType) => state.contacts.contacts);
    const isLoading = useSelector((state: AppRootStateType) => state.app.isLoading);

    useEffect(() => {
        dispatch(setContactThunk(userId))
    }, [])

    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const modalFormCallback = (data: ContactType) => {
        if (data.id) {
            dispatch(updateContact({
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            }))
        } else {
            dispatch(addNewContact(data))
        }
    }

    return (
        <section>
            <Container sx={{height: "100vh", width: "100vw"}}>
                <ModalForm callback={modalFormCallback}/>
                <ModalInfo/>
                <ButtonAppBar/>
                {isLoading && <PreLoader/>}
                {
                    contacts?.map((item: ContactType) => {
                        return <Card
                            key={item.id}
                            first_name={item.first_name}
                            last_name={item.last_name}
                            email={item.email}
                            id={item.id}
                        />
                    })
                }
            </Container>
        </section>
    );
};