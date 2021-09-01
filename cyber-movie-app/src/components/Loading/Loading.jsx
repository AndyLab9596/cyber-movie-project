import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        justifyContent: "center",
        alignItems: "center",
        height: '80vh'
    },
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size="3rem" />
        </div>
    );
}
