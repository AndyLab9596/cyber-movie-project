import { Avatar, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { LoginUser } from '../../../store/actions/Auth';

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

const schema = yup.object().shape({
    taiKhoan: yup.string().required('username is required'),
    matKhau: yup.string().required('password is required'),

});

const Login = ({ closeDialog }) => {
    const history = useHistory();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { values, handleChange, handleBlur, setTouched, isValid, touched, errors } = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        validateOnMount: true,
        validationSchema: schema,
    })
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({
            taiKhoan: true,
            matKhau: true,

        })
        if (!isValid) return
        dispatch(LoginUser(values,
            (msg) => {
                enqueueSnackbar(msg, { variant: 'success' })
            },
            (msg) => {
                enqueueSnackbar(msg, { variant: 'error' })
            }
        ))
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
                <TextField name="taiKhoan" value={values.taiKhoan} onChange={handleChange} onBlur={handleBlur} fullWidth label="username" variant="outlined" margin="normal"
                    error={touched.taiKhoan && !!errors.taiKhoan}
                    helperText={touched.taiKhoan && errors.taiKhoan}

                />
                <TextField name="matKhau" value={values.matKhau} onChange={handleChange} onBlur={handleBlur} fullWidth label="password" variant="outlined" margin="normal" type="password"
                    error={touched.matKhau && !!errors.matKhau}
                    helperText={touched.taiKhoan && errors.matKhau}
                />
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