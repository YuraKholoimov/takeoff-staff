import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {AppRootStateType, useAppDispatch} from "../../../bll/store";
import {useSelector} from "react-redux";
import {setModalInfoOpen} from "../../../bll/appSlice";
import {ContactType, deleteContact} from "../../../bll/contactSlice";
import {ButtonGroup} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalInfo: React.FC<ModalInfoPropsType> = () => {
    const {isModalInfoOpen} = useSelector((state: AppRootStateType) => state.app.modalInfo);
    const modalData = useSelector((state: AppRootStateType) => state.app.modalInfo.modalData);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setModalInfoOpen({isModalInfoOpen: false, modalData: {id: "", first_name: '', last_name: '', email: ''}}))
    };

    const onClickDeleteButton = () => {
        modalData && modalData.id && dispatch(deleteContact(modalData.id))
    }

    return (
        <div>
            <Modal
                open={isModalInfoOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Do you want to delete {modalData?.first_name} {modalData?.last_name}?
                    </Typography>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        sx={{display: "flex", justifyContent: "center"}}
                    >
                        <Button color={"primary"} onClick={handleClose}>Cancel</Button>
                        <Button color={"error"} onClick={onClickDeleteButton}>Delete</Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </div>
    );
}

type ModalInfoPropsType = {}