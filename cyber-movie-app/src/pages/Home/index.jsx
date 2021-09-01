import { Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, Grid, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import MovieList from '../../components/MovieList/MovieList';
import MovieSkeletonList from '../../components/Skeleton/MovieSkeletonList';
import { HomeMovieWithPaginationAction } from '../../store/actions/HomeMovieAction';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    movieImg: {
        width: "100%",
        objectFit: "cover",
        objectPosition: 'center',
        height: "280px",
        display: "block",
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
    },
    heading: {
        fontWeight: 'bold',
        marginTop: '2rem',
        marginBottom: '2rem',
        width: '100%',
        borderBottom: '2px solid #000',
        paddingBottom: '1rem'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    movieName: {
        fontWeight: "500",
        color: theme.palette.common.black
    },
    desc: {
        color: theme.palette.grey[500]
    },
    dialog: {
        maxWidth: '100%'
    }

}))

const Home = () => {
    const dispatch = useDispatch()
    const arrMoviesWithPagination = useSelector(state => state.HomeMovieReducer.arrMoviesWithPagination.arrMovies);
    const totalPages = useSelector(state => state.HomeMovieReducer.arrMoviesWithPagination.totalPages);
    const [pagination, setPagination] = useState(1);
    const [loading, setLoading] = useState(true)


    const handleChange = (e, page) => {
        setPagination(page)
    }

    useEffect(() => {
        dispatch(HomeMovieWithPaginationAction(pagination, () => {
            setLoading()
        }))

    }, [pagination, dispatch])

    const classes = useStyles();

    return (

        <div className={classes.root}>
            {/* <HomeCarousel /> */}
            <Container maxWidth="lg" align="center">
                <Typography variant="h4" color="primary" component="h1" align="left" mt={5} gutterBottom className={classes.heading}>
                    HOT MOVIES
                </Typography>

                {loading
                    ? <MovieSkeletonList length={12} />
                    : <MovieList arrMoviesWithPagination={arrMoviesWithPagination} />
                }
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

export default memo(Home);