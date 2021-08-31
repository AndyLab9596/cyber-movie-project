import { Box, Card, CardActionArea, CardContent, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HomeMovieWithPaginationAction } from '../../store/actions/HomeMovieAction';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    movieImg: {
        width: "100%",
        objectFit: "cover",
        height: "420px",
        display: "block"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        flexFlow: 'row nowrap',
    },
    title: {
        minHeight: "105px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

})

const Home = () => {


    const dispatch = useDispatch()
    const arrMoviesWithPagination = useSelector(state => state.HomeMovieReducer.arrMoviesWithPagination.arrMovies);
    const totalPages = useSelector(state => state.HomeMovieReducer.arrMoviesWithPagination.totalPages);
    const [pagination, setPagination] = useState(1)

    const handleChange = (e, page) => {
        setPagination(page)
    }

    useEffect(() => {
        dispatch(HomeMovieWithPaginationAction(pagination))

    }, [pagination, dispatch])

    const classes = useStyles();

    return (

        <div className={classes.root}>
            {/* <HomeCarousel /> */}

            <Typography variant="h4" color="primary" component="h1" align="center" mt={5} gutterBottom>
                Hot movies
            </Typography>

            <Container maxWidth="lg" align="center">
                <Grid container spacing={2} align="center">
                    {arrMoviesWithPagination.map((movie, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <NavLink to={`/detail/${movie.maPhim}`} className={classes.movie}>
                                    <Card>
                                        <CardActionArea>
                                            <img className={classes.movieImg} src={movie.hinhAnh} alt="hinh anh"
                                                onError={e => (e.target.src = "https://picsum.photos/200/300")} />
                                            <CardContent className={classes.title}>
                                                <Typography gutterBottom variant="h6" component="h2" >
                                                    {movie.tenPhim}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </NavLink>
                            </Grid>
                        )
                    })}
                </Grid>
                <Box container my={6} className={classes.pagination} >
                    <Pagination
                        page={pagination}
                        count={totalPages}
                        color="primary"
                        onChange={handleChange}
                    />
                </Box>
            </Container>

        </div >
    );
};

export default Home;