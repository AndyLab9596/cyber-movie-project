import { Box, Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { HomeSingleMovie } from '../../store/actions/HomeMovieAction';
import Loading from '../../components/Loading/Loading';
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

const Detail = () => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const detailId = useParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(HomeSingleMovie(detailId.id, () => {
            setLoading()
        }))
    }, [dispatch, detailId.id, loading])
    const singleMovie = useSelector(state => state.HomeMovieReducer.singleMovie);

    const { biDanh, danhGia, hinhAnh, maPhim, moTa, ngayKhoiChieu, tenPhim, trailer } = singleMovie;


    return (
        <Container maxWidth="md" className={classes.root}>
            {loading ? <Loading /> : (
                <Grid container spacing={3}>
                    <Grid items xs={12} sm={4} >
                        <img src={hinhAnh} alt={biDanh} className={classes.movieImg} onError={e => (e.target.src = "https://picsum.photos/id/237/200/300")} />
                    </Grid>
                    <Grid items xs={12} sm={8} >
                        <Box className={classes.intro}>
                            <Typography variant="h3" className={classes.title}>
                                {tenPhim}
                            </Typography>
                            <Typography variant="body1" className={classes.info}>
                                {moTa}
                            </Typography>

                            <NavLink to="/" >
                                <Button variant="contained" color="primary" className={classes.button}>
                                    Back to home
                                </Button>
                            </NavLink>
                        </Box>
                    </Grid>
                </Grid>
            )}

        </Container>
    );
};

export default Detail;