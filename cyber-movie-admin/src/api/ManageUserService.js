
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

    addingUser = (values) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, values)
    }

    editingUser = (values) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values)
    }

    deletingUser = (values) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${values}`)
    }

}

export const manageUserService = new ManageUserService();