import { Box, Grid } from '@material-ui/core';
import { Skeleton } from 'antd';
import React from 'react';

const MovieSkeletonList = ({ length }) => {
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((movie, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box padding={1}>
                            <Skeleton variant="rect" width="100%" height={200} />
                            <Skeleton />
                            <Skeleton with="60%"></Skeleton>
                        </Box>
                    </Grid>
                ))}

            </Grid>

        </Box>
    );
};

export default MovieSkeletonList;