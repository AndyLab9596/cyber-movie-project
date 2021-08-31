import { Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, Grid, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
    const [pagination, setPagination] = useState(1)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <Container maxWidth="lg" align="center">
                <Typography variant="h4" color="primary" component="h1" align="left" mt={5} gutterBottom className={classes.heading}>
                    HOT MOVIES
                </Typography>
                <Grid container spacing={2} align="center">
                    {arrMoviesWithPagination.map((movie, index) => {
                        return (
                            <>
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card className={classes.card}>
                                        <img className={classes.movieImg} src={movie.hinhAnh} alt="hinh anh"
                                            onError={e => (e.target.src = "https://picsum.photos/200/300")} />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2" align="left" className={classes.movieName}>
                                                {movie.tenPhim}
                                            </Typography>
                                            <Typography variant="body2" align="left" className={classes.desc}>
                                                {movie.moTa.length > 50 ? movie.moTa.substr(0, 50) + '...' : movie.moTa}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="secondary" variant="outlined" onClick={handleClickOpen}>
                                                Trailer
                                            </Button>
                                            <NavLink to={`/detail/${movie.maPhim}`} className={classes.movie}>
                                                <Button size="small" color="primary">
                                                    More info
                                                </Button>
                                            </NavLink>
                                        </CardActions>
                                    </Card>
                                </Grid>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    maxWidth="lg"
                                >
                                    <DialogContent >
                                        <iframe width="809" height="455" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
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