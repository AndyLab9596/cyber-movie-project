import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MovieIcon from '@material-ui/icons/Movie';
import React, { memo, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Login from '../../../pages/Auth/Login';
import Register from '../../../pages/Auth/Register';
import createAction from '../../../store/actions';
import { actionTypes } from '../../../store/actions/Types';
import { TOKEN, USER } from '../../../ultis/settings/config';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    icon: {
        marginRight: theme.spacing(2),

    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: "#fff"
    },
}));

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
}

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null)
    const currentUser = useSelector(state => state.UserReducer.registerUser);


    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleUerClick = (e) => {
        setAnchorEl(e.currentTarget)
    };

    const handleLogoutClick = () => {
        dispatch(createAction(actionTypes.LOGOUT_USER))
        history.push("/")
        window.location.reload()
    };



    return (
        <div className={classes.root}>
            <AppBar position="sticky" elevation={5} className={classes.appbar}>
                <Toolbar>
                    <MovieIcon color="#fff" className={classes.icon} />
                    <Typography className={classes.title} variant="h6" noWrap>
                        Movie List
                    </Typography>

                    {!localStorage.getItem(TOKEN) && (
                        <Button color="inherit" onClick={handleOpen}>Login</Button>
                    )}

                    {localStorage.getItem(TOKEN) && (
                        <>
                            <Typography>{currentUser?.taiKhoan}</Typography>
                            <IconButton>
                                <AccountCircle color="inherit" onClick={handleUerClick} />
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {localStorage.getItem(TOKEN) && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    getContentAnchorEl={null}
                >
                    <Link to={`/personal/`}>
                        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Menu>
            )}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>

                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} openDialog={handleOpen} setMode={() => setMode(MODE.LOGIN)} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here
                                </Button>
                            </Box>

                        </>
                    )}

                    {(mode === MODE.LOGIN) && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="secondary" onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account. Register here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default memo(Header);