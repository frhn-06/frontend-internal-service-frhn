import instance from "@/libs/axios";
import endpoint from "./endpoint";
import { IUpdatePasswordForm, IUpdateProfileForm } from "@/types/user";

const UserService = {
    updateProfile: (data: IUpdateProfileForm) => instance.patch(`${endpoint.USER}/update-profile`, data),

    updatePassword: (data: IUpdatePasswordForm) => instance.patch(`${endpoint.USER}/update-password`, data),
}

export default UserService