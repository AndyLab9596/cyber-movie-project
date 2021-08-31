import { GROUPID } from "../ultis/settings/config";
import baseService from "./baseService";

export class ManageMovieService extends baseService {
    constructor(props) {
        super()
    }

    getMovies = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    getMoviesWithPagination = (page) => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GROUPID}&soTrang=${page}&soPhanTuTrenTrang=12`)
    }

    getSingleMovie = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }

}

export const manageMovieService = new ManageMovieService();