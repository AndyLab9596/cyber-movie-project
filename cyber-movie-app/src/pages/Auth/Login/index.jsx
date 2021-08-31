import { Avatar, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { LoginUser } from '../../../store/actions/Auth';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(2),
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        margin: theme.spacing(2, 0, 2, 0),
        textAlign: "center",
    },

    submit: {
        margin: theme.spacing(3, 0, 1, 0)
    },
    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    }
}))

const Login = ({ closeDialog }) => {
    const history = useHistory()
    const classes = useStyles();
    const { values, handleChange, handleBlur } = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        // validateOnMount: true,
        // validationSchema:
    })
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginUser(values))
    }

    const registerUser = useSelector(state => state.UserReducer.registerUser);

    useEffect(() => {
        if (registerUser) {
            closeDialog()
        }
    }, [registerUser, closeDialog])

    return (
        <div className={classes.root}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
            </div>

            <Typography component="h3" variant="h5" color="primary" className={classes.title}>
                Login
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
                <TextField name="taiKhoan" value={values.taiKhoan} onChange={handleChange} onBlur={handleBlur} fullWidth label="username" variant="outlined" margin="normal" />
                <TextField name="matKhau" value={values.matKhau} onChange={handleChange} onBlur={handleBlur} fullWidth label="password" variant="outlined" margin="normal" type="password" />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth className={classes.submit}
                    size="large"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default memo(Login);