import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { AddingUser } from '../../store/actions/Auth';

const useStyles = makeStyles({
    root: {
        width: "100%",
    }
})

const UserAdding = () => {
    const classes = useStyles();
    const { values, handleChange, handleBlur, resetForm } = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "",
            hoTen: "",
            maLoaiNguoiDung: "",
        },
        // validateOnMount: true,
        // validationSchema:
    })
    const dispatch = useDispatch();
    // const registerUser = useSelector(state => state.UserReducer.registerUser);
    // const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(AddingUser(values,
            (msg) => {
                enqueueSnackbar(msg, { variant: 'success' })
            },
            (msg) => {
                enqueueSnackbar(msg, { variant: 'error' })
            },
            () => resetForm({})
        ))

        console.log(values)
    }
    return (
        <Paper className={classes.root}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                ADDING USER
            </Typography>
            <Box p={2}>
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6}>
                            <TextField name="taiKhoan" value={values.taiKhoan} onChange={handleChange} onBlur={handleBlur} fullWidth label="username" variant="outlined" margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="matKhau" value={values.matKhau} onChange={handleChange} onBlur={handleBlur} fullWidth label="password" variant="outlined" margin="normal" type="password" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} fullWidth label="email" variant="outlined" margin="normal" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField name="soDt" value={values.soDt} onChange={handleChange} onBlur={handleBlur} fullWidth label="phone" variant="outlined" margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="maNhom" value={values.maNhom} onChange={handleChange} onBlur={handleBlur} fullWidth label="group" variant="outlined" margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="hoTen" value={values.hoTen} onChange={handleChange} onBlur={handleBlur} fullWidth label="fullname" variant="outlined" margin="normal" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="maLoaiNguoiDung" value={values.maLoaiNguoiDung} onChange={handleChange} onBlur={handleBlur} fullWidth label="type of user" variant="outlined" margin="normal" />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth className={classes.submit}
                        size="large"

                    >
                        ADDING USER
                    </Button>
                </form>
            </Box>
        </Paper>
    );
};

export default UserAdding;