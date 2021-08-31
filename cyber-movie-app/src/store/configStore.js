import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import HomeMovieReducer from "./reducers/HomeMovieReducer";
import UserReducer from "./reducers/UserReducer";

const rootReducer = combineReducers({
    HomeMovieReducer,
    UserReducer,

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;