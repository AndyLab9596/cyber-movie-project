import { actionTypes } from "../actions/Types";

const initialState = {
    arrMovies: [],
    arrMoviesWithPagination: {
        arrMovies: [],
        totalPages: '',
    },
    singleMovie: {},

}

const HomeMovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES: {
            state.arrMovies = action.payload;
            return { ...state }
        }
        case actionTypes.SET_MOVIES_PAGINATION: {
            state.arrMoviesWithPagination.arrMovies = action.payload.items;
            state.arrMoviesWithPagination.totalPages = action.payload.totalPages;
            return { ...state }
        }
        case actionTypes.SET_SINGLE_MOVIE: {
            state.singleMovie = action.payload;

            return { ...state, loading: false }
        }
        default:
            return { ...state }
    }
}

export default HomeMovieReducer;