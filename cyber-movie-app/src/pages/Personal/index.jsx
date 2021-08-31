import { Box, Button, Container, Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(5),
    },
    intro: {
        marginLeft: "20px"
    },
    movieImg: {
        display: "block",
        width: "100%",
        height: "475px",
    },
    title: {
        fontWeight: "bold"
    },
    info: {
        marginTop: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(3)
    }
}))

const Personal = () => {
    const classes = useStyles()
    const currentUser = useSelector(state => state.UserReducer.registerUser);
    console.log(currentUser)
    const { email, hoTen, maNhom, soDT, taiKhoan, matKhau } = currentUser || {}
    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid container spacing={3}>
                <Grid items xs={12} sm={4} >
                    <img src="https://picsum.photos/200/300" alt="pho"
                        className={classes.movieImg}
                        onError={e => (e.target.src = "https://picsum.photos/200/300")} />
                </Grid>
                <Grid items xs={12} sm={8} >
                    <Box className={classes.intro}>
                        <Typography variant="h6" className={classes.title}>
                            Username: {taiKhoan}
                        </Typography>
                        <Typography variant="body1" className={classes.info}>
                            Email: {email}
                        </Typography>
                        <Typography variant="body1" className={classes.info}>
                            Group: {maNhom}
                        </Typography>
                        <Typography variant="body1" className={classes.info}>
                            Phone: {soDT}
                        </Typography>
                        <Typography variant="body1" className={classes.info}>
                            Full name: {hoTen}
                        </Typography>
                        <NavLink to="/" >
                            <Button variant="contained" color="primary" className={classes.button}>
                                Back to home
                            </Button>
                        </NavLink>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Personal;