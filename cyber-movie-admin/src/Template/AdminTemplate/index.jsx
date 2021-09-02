import { Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import MovieIcon from '@material-ui/icons/Movie';
import PeopleIcon from '@material-ui/icons/People';
import clsx from 'clsx';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, Route, useHistory } from 'react-router-dom';
import BasicTable from '../../component/Table';
import createAction from '../../store/actions';
import { actionTypes } from '../../store/actions/Types';
import { TOKEN } from '../../ultis/settings/config';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserControl from '../../pages/UserControl';
import { AccountBoxOutlined, AddCircleRounded, ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: "none",
        listStyleType: 'none'
    },
    activeNavLinK: {
        backgroundColor: theme.palette.grey[300]
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function AdminTemplate(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleListClick = () => {
        setOpenList(state => !state)
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogoutClick = () => {
        dispatch(createAction(actionTypes.LOGOUT_USER))
        history.push("/")
        window.location.reload()
    };
    const currentUser = useSelector(state => state.UserReducer.registerUser);
    const { Component, redirectPath, ...restRoute } = props;

    return (
        <Route {...restRoute} render={(propsRoute) => {
            if (!localStorage.getItem(TOKEN)) {
                return <Redirect to={redirectPath} />
            }
            return <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            ADMIN
                        </Typography>
                        {localStorage.getItem(TOKEN) && (
                            <>
                                <Typography>{currentUser?.taiKhoan}</Typography>
                                <IconButton>
                                    <AccountCircle />
                                </IconButton>
                                <IconButton>
                                    <ExitToAppIcon color="secondary" onClick={handleLogoutClick} />
                                </IconButton>
                            </>
                        )}
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <Typography variant="h5" color="primary">
                            Control
                        </Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>

                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={handleListClick}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="User Control" />
                            {openList ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openList} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <NavLink to="/admin/user" className={classes.navLink}>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <AccountBoxOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary="User List" />
                                    </ListItem>
                                </NavLink>
                            </List>
                            <List component="div" disablePadding >
                                <NavLink to="/admin/user/add" className={classes.navLink}>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <AddCircleRounded />
                                        </ListItemIcon>
                                        <ListItemText primary="Adding User" />
                                    </ListItem>
                                </NavLink>
                            </List>
                        </Collapse>
                    </List>
                    <Divider />

                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Component {...propsRoute} />
                </main>
            </div>
        }} />
    );
}