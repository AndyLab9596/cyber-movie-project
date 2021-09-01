
import { GROUPID } from "../ultis/settings/config";
import baseService from "./baseService";

export class ManageUserService extends baseService {
    constructor(props) {
        super()
    }

    registerUser = (values) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, values)
    }

    loginUser = (values) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, values)
    }

    getUserInfo = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    getAllUsersInfo = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

}

export const manageUserService = new ManageUserService();