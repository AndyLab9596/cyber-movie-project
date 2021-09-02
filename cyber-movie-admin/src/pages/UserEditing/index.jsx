import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { AddingUser, EditingUser } from '../../store/actions/Auth';
import { useHistory, useParams } from 'react-router-dom';
import { GROUPID } from '../../ultis/settings/config';

const useStyles = makeStyles({
    root: {
        width: "100%",
    }
})

const people = [
    {
        value: 'KhachHang',
        label: 'customer'
    },
    {
        value: 'QuanTri',
        label: 'admin'
    }
]

const UserEditing = (props) => {
    const classes = useStyles();
    const { tk } = useParams()
    const history = useHistory();

    const users = useSelector(state => state.UserReducer.users);
    const editUser = users.filter((user) => user.taiKhoan === tk)
    console.log(editUser)
    const { email, hoTen, maLoaiNguoiDung, matKhau, soDt, taiKhoan } = editUser[0] || {};


    const { values, handleChange, handleBlur, resetForm, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: taiKhoan,
            matKhau: matKhau,
            email: email,
            soDt: soDt,
            maNhom: GROUPID,
            hoTen: hoTen,
            maLoaiNguoiDung: maLoaiNguoiDung,
        },
        // validateOnMount: true,
        // validationSchema:
    })
    const [typeOfPeople, setTypeOfPeople] = useState(maLoaiNguoiDung);

    const dispatch = useDispatch();
    const handleSelect = (e) => {
        setTypeOfPeople(e.target.value);
        setFieldValue('maLoaiNguoiDung', e.target.value)
    }
    // const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(EditingUser(values,
            (msg) => {
                enqueueSnackbar(msg, { variant: 'success' })
            },
            (msg) => {
                enqueueSnackbar(msg, { variant: 'error' })
            },
            () => {
                history.push('/admin/user')
            }

        ))
        console.log(values)

    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                EDITING USER
            </Typography>
            <Box p={2}>
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
                        <Grid item xs={12} sm={6}>
                            <TextField disabled name="taiKhoan" value={values.taiKhoan} onChange={handleChange} onBlur={handleBlur} fullWidth label="username" variant="outlined" margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="matKhau" value={values.matKhau} onChange={handleChange} onBlur={handleBlur} fullWidth label="password" variant="outlined" margin="normal" />
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
                            <TextField select name="maLoaiNguoiDung" value={typeOfPeople} onChange={handleSelect}

                                SelectProps={{
                                    native: true,
                                }}
                                fullWidth label="type of user" variant="outlined" margin="normal" >
                                {people.map(option => (

                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth className={classes.submit}
                        size="large"
                    >
                        EDITING USER
                    </Button>
                </form>
            </Box>
        </Paper>
    );
};

export default UserEditing;