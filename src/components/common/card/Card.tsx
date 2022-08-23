import React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {BasicTooltip} from "../basicTooltip/BasicTooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import {useDispatch} from "react-redux";
import {setModalFormOpen, setModalInfoOpen} from "../../../bll/appSlice";

export const Card: React.FC<CardPropsType> = ({id, first_name, last_name, email}) => {
    const dispatch = useDispatch<any>();

    const onClickHandlerEdit = () => {
        dispatch(setModalFormOpen({isOpen: true, title: "Edit contact", modalData: {id, first_name, last_name, email}}))
    }

    const onClickHandlerDelete = () => {
        dispatch(setModalInfoOpen({isModalInfoOpen: true, modalData: {id, first_name, last_name, email}}))
    }

    return (
        <div>
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={first_name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{
                                        display: 'inline',
                                        mr: 3
                                    }}
                                    component="span"
                                    variant="subtitle1"
                                    color="text.primary"
                                >
                                    {last_name}
                                </Typography>
                                {email}
                            </React.Fragment>
                        }
                    />
                    <BasicTooltip
                        title={"Change"}
                        children={<SettingsSuggestIcon/>}
                        onClickHandler={onClickHandlerEdit}/>
                    <BasicTooltip
                        title={"Delete"}
                        children={<DeleteIcon/>}
                        onClickHandler={onClickHandlerDelete}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
            </List>
        </div>
    );
};

export type CardPropsType = {
    id?: string
    first_name: string
    last_name: string
    email: string
}