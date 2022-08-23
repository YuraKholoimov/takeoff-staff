import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {alpha, styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../bll/store";
import {setIsLogin} from "../../bll/authSlice";
import {setModalFormOpen} from "../../bll/appSlice";
import {useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import {searchContact} from "../../bll/contactSlice";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function ButtonAppBar() {
    const dispatch = useAppDispatch();
    const isLogin = useSelector((state: AppRootStateType) => state.auth.isLogin);
    const [value, setValue] = useState('');

    const onClickHandel = () => {
        dispatch(setIsLogin({isLogin: false}))
        localStorage.removeItem("login")
    }

    const handleClickOpen = () => {
        dispatch(setModalFormOpen({isOpen: true, title: "Add new contact"}))
    };


    const searchValue = useDebounce(value, 1000)

    const onInputHandler = (e: any) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        dispatch(searchContact(searchValue))
    }, [searchValue])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Contacts</Typography>

                    {/*----- Add button -----*/}
                    <Button variant="contained" color={"success"} onClick={handleClickOpen}>
                        Add contact
                    </Button>

                    {/*----- Search ------*/}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                            onInput={onInputHandler}
                        />
                    </Search>

                    {/*----- Logout button -----*/}
                    {isLogin && <Button color="inherit" onClick={onClickHandel}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}