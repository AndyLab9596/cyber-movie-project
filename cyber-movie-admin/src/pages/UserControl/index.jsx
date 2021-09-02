import { Button, IconButton, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DeletingUser, FetchAllUser } from '../../store/actions/Auth';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    searchBar: {
        margin: '.5rem'
    }
});

export default function UserControl() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { enqueueSnackbar } = useSnackbar();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const dispatch = useDispatch()


    const users = useSelector(state => state.UserReducer.users);
    const tableHeader = _.keys(users[0]);
    tableHeader.push('Thao tác')

    useEffect(() => {
        dispatch(FetchAllUser());


    }, [dispatch])

    return (
        <Paper className={classes.root}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                USER LIST
            </Typography>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {tableHeader.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    style={{ minWidth: '120px' }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell align="right">
                                        {user.taiKhoan}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.hoTen}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.email}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.soDt}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.matKhau}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.maLoaiNguoiDung}
                                    </TableCell>
                                    <TableCell align="center">
                                        <NavLink to={`/admin/user/edit/${user.taiKhoan}`}>
                                            <IconButton color="primary" size="small">
                                                <EditIcon />
                                            </IconButton>
                                        </NavLink>
                                        <IconButton color="secondary" size="small" onClick={() => {
                                            dispatch(DeletingUser(
                                                user.taiKhoan,
                                                (msg) => {
                                                    enqueueSnackbar(msg, { variant: 'success' })
                                                },
                                                (msg) => {
                                                    enqueueSnackbar(msg, { variant: 'error' })
                                                }
                                            ))
                                        }} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
