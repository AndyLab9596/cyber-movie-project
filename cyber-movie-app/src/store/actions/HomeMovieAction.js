import { manageMovieService } from "../../api/ManageMovieService";
import createAction from './index'
import { actionTypes } from './Types/index'
export const HomeMovieAction = () => {
    return async (dispatch) => {
        try {
            const res = await manageMovieService.getMovies()
            dispatch(createAction(actionTypes.SET_MOVIES, res.data.content))
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const HomeMovieWithPaginationAction = (page) => {
    return async (dispatch) => {
        try {
            const res = await manageMovieService.getMoviesWithPagination(page)
            dispatch(createAction(actionTypes.SET_MOVIES_PAGINATION, res.data.content))
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const HomeSingleMovie = (maNhom) => {
    return async (dispatch) => {
        try {
            const res = await manageMovieService.getSingleMovie(maNhom)
            dispatch(createAction(actionTypes.SET_SINGLE_MOVIE, res.data.content))
        }
        catch (err) {
            console.log(err)
        }
    }
}




