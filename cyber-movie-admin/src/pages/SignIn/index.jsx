import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginUser } from '../../store/actions/Auth';
import * as yup from 'yup';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const schema = yup.object().shape({
    taiKhoan: yup.string().required('username is required'),
    matKhau: yup.string().required('password is required'),

});

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
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
    const handleSubmit = async (e) => {
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
            },
            () => history.push('/admin/user')
        )
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        name="taiKhoan" value={values.taiKhoan} onChange={handleChange} onBlur={handleBlur} fullWidth label="username" variant="outlined" margin="normal"
                        error={touched.taiKhoan && !!errors.taiKhoan}
                        helperText={touched.taiKhoan && errors.taiKhoan}
                    />
                    <TextField
                        name="matKhau" value={values.matKhau} onChange={handleChange} onBlur={handleBlur} fullWidth label="password" variant="outlined" margin="normal" type="password"
                        error={touched.matKhau && !!errors.matKhau}
                        helperText={touched.taiKhoan && errors.matKhau}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}