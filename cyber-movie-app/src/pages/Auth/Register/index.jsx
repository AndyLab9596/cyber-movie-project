import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import { TextField, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RegisterUser } from '../../../store/actions/Auth';
import * as yup from 'yup';

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
    soDt: yup.number().required('phone number is required'),
    maNhom: yup.string().required('groupid is required'),
    hoTen: yup.string().required('fullname is required'),
    email: yup.string().required('email is required').email().required('Email is invalid'),
});

const Register = ({ closeDialog }) => {

    const classes = useStyles();
    const { values, handleChange, handleBlur, isValid, setTouched, touched, errors } = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "",
            hoTen: "",
        },
        validateOnMount: true,
        validationSchema: schema
    })
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({
            taiKhoan: true,
            matKhau: true,
            email: true,
            soDt: true,
            maNhom: true,
            hoTen: true,
        })
        if (!isValid) return
        dispatch(RegisterUser(values,
            (msg) => {
                enqueueSnackbar(msg, { variant: 'success' })
            },
            (msg) => {
                enqueueSnackbar(msg, { variant: 'error' })
            },
            () => closeDialog(),
        ))
    }


    return (
        <div className={classes.root}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar className={classes.avatar}   >
                    <LockOutlined />
                </Avatar>
            </div>

            <Typography component="h3" variant="h5" color="primary" className={classes.title}>
                Create an account
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <TextField name="taiKhoan" value={values.taiKhoan} onChange={handleChange} onBlur={handleBlur} fullWidth label="username" variant="outlined" margin="normal"
                            error={touched.taiKhoan && !!errors.taiKhoan}
                            helperText={touched.taiKhoan && errors.taiKhoan}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="matKhau" value={values.matKhau} onChange={handleChange} onBlur={handleBlur} fullWidth label="password" variant="outlined" margin="normal" type="password"
                            error={touched.matKhau && !!errors.matKhau}
                            helperText={touched.taiKhoan && errors.matKhau}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} fullWidth label="email" variant="outlined" margin="normal"
                            error={touched.email && !!errors.email}
                            helperText={touched.taiKhoan && errors.email}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField name="soDt" value={values.soDt} onChange={handleChange} onBlur={handleBlur} fullWidth label="phone" variant="outlined" margin="normal"
                            error={touched.soDt && !!errors.soDt}
                            helperText={touched.taiKhoan && errors.soDt}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="maNhom" value={values.maNhom} onChange={handleChange} onBlur={handleBlur} fullWidth label="group" variant="outlined" margin="normal"
                            error={touched.maNhom && !!errors.maNhom}
                            helperText={touched.taiKhoan && errors.maNhom}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="hoTen" value={values.hoTen} onChange={handleChange} onBlur={handleBlur} fullWidth label="fullname" variant="outlined" margin="normal"
                            error={touched.hoTen && !!errors.hoTen}
                            helperText={touched.taiKhoan && errors.hoTen}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth className={classes.submit}
                    size="large"
                >
                    Create an account
                </Button>
            </form>
        </div>
    );
};

export default Register;