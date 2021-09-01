import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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

const MovieList = ({ arrMoviesWithPagination }) => {

    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
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
    );
};

export default MovieList;