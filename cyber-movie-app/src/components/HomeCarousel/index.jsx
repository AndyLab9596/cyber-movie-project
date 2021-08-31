import React, { Fragment } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { HomeMovieAction } from '../../store/actions/HomeMovieAction';

const contentStyle = {
    height: '90vh',
    color: '#fff',
    textAlign: 'center',
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center ",
    zIndex: 5
};


const HomeCarousel = () => {

    const dispatch = useDispatch();
    const arrMovies = useSelector(state => state.HomeMovieReducer.arrMovies);
    console.log(arrMovies)

    useEffect(() => {
        dispatch(HomeMovieAction())
    }, [])

    return (
        <Carousel effect="fade" style={{ marginBottom: "5rem" }}>
            {arrMovies.slice(0, 3).map((movie, index) => {
                return (
                    <Fragment key={index}>
                        <div style={{ ...contentStyle, backgroundImage: `url(${movie.hinhAnh}) ` }}></div>
                    </Fragment>
                )
            })}
        </Carousel>
    )
};

export default HomeCarousel;