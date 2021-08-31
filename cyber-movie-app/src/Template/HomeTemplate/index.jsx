import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header'
const HomeTemplate = (props) => {

    const { Component, ...propsRoute } = props;

    return (
        <Route {...propsRoute} render={(propsRoute) => {
            return <Fragment>
                <Header  {...propsRoute} />
                <Component  {...propsRoute} />
                <Footer  {...propsRoute} />
            </Fragment>
        }} />
    );
};

export default HomeTemplate;