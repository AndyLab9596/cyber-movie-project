import axios from "axios";
import { manageUserService } from "../../api/ManageUserService";
import { TOKEN, USER } from "../../ultis/settings/config";
import createAction from './index';
import { actionTypes } from "./Types";


export const RegisterUser = (values) => {
    return async (dispatch) => {
        try {
            const res = await manageUserService.registerUser(values);
            dispatch(createAction(actionTypes.REGISTER_USER, res.data.content));
            console.log(res)
        }
        catch (err) {
            alert(err.response.data.content)

        }
    }
}

export const LoginUser = (values) => {

    return async (dispatch) => {
        try {

            const res = await manageUserService.loginUser(values);

            localStorage.setItem(TOKEN, res.data.content.accessToken);
            localStorage.setItem(USER, JSON.stringify(res.data.content));
            dispatch(createAction(actionTypes.LOGIN_USER, res.data.content));
            console.log(res)
        }
        catch (err) {
            alert(err.response.data.content)
        }
    }
}

// export const FetchUser = () => {
//     return async (dispatch) => {
//         try {
//             const res = await manageUserService.getUserInfo();
//             dispatch(createAction(actionTypes.LOGIN_USER, res.data.content));
//         }
//         catch (err) {
//             console.log(err.response)
//         }
//     }
// }

export const FetchUser = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem(TOKEN),
                }
            })
            dispatch(createAction(actionTypes.LOGIN_USER, res.data.content));

        } catch (err) {
            console.log(err.response.data.content)
        }
    }
}

