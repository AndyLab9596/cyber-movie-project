import { manageUserService } from "../../api/ManageUserService";
import { TOKEN, USER } from "../../ultis/settings/config";
import createAction from './index';
import { actionTypes } from "./Types";


export const RegisterUser = (values, success, error, closeDialog) => {
    return async (dispatch) => {
        try {
            const res = await manageUserService.registerUser(values);
            dispatch(createAction(actionTypes.REGISTER_USER, res.data.content));
            localStorage.setItem(USER, JSON.stringify(res.data.content));
            success('Register successfully');
            closeDialog();
        }
        catch (err) {
            error(err.response.data.content)
        }
    }
}

export const LoginUser = (values, success, error, history) => {

    return async (dispatch) => {
        try {

            const res = await manageUserService.loginUser(values);

            localStorage.setItem(TOKEN, res.data.content.accessToken);
            localStorage.setItem(USER, JSON.stringify(res.data.content));
            dispatch(createAction(actionTypes.LOGIN_USER, res.data.content));
            success('Login successfully')
        }
        catch (err) {
            error(err.response.data.content);

        }
        history()

    }
}

export const FetchUser = () => {
    return async (dispatch) => {
        try {
            const res = await manageUserService.getUserInfo();
            dispatch(createAction(actionTypes.LOGIN_USER, res.data.content));
        }
        catch (err) {
            console.log(err.response)
        }
    }
}

export const FetchAllUser = () => {
    return async (dispatch) => {
        try {
            const res = await manageUserService.getAllUsersInfo();
            dispatch(createAction(actionTypes.FETCH_ALL_USER, res.data.content));
            // console.log(res.data.content);
        }
        catch (err) {
            console.log(err.response)
        }
    }
}

export const AddingUser = (values, success, error, reset) => {
    return async (dispatch) => {
        try {
            const res = await manageUserService.addingUser(values);
            success('Adding user successfully')
            reset()
            dispatch(FetchAllUser())
        }
        catch (err) {
            console.log(err.response)
            error(err.response.data.content)
        }
    }
}

export const EditingUser = (values, success, error, history) => {
    return async (dispatch) => {
        try {
            const res = await manageUserService.editingUser(values);
            success('Editing user successfully')
            history()
            dispatch(FetchAllUser())
        }
        catch (err) {
            console.log(err.response)
            error(err.response.data.content)
        }
    }
}

export const DeletingUser = (values, success, error) => {
    return async (dispatch) => {
        try {
            const res = await manageUserService.deletingUser(values);
            dispatch(FetchAllUser())
            success('Deleting user successfully')
            console.log(res)
        }
        catch (err) {
            console.log(err.response)
            error(err.response.data.content)
        }
    }
}


