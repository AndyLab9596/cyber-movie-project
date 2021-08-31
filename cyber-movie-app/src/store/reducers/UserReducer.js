import { TOKEN, USER } from "../../ultis/settings/config";
import { actionTypes } from "../actions/Types";

const initialState = {
    registerUser: null
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_USER: {
            state.registerUser = action.payload;
            return { ...state }
        }
        case actionTypes.LOGIN_USER: {
            state.registerUser = action.payload
            return { ...state }
        }
        case actionTypes.FETCH_USER: {
            state.registerUser = action.payload
            return { ...state }
        }
        case actionTypes.LOGOUT_USER: {
            localStorage.removeItem(USER);
            localStorage.removeItem(TOKEN);
            state.registerUser = {}
            return { ...state }
        }

        default:
            return { ...state }
    }
}

export default UserReducer;