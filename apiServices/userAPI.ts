import axios from "axios";

import { UsersEndPoints } from "../shared/constants/api.contsnts";
import { CaptureType } from "../interfaces/capture";
import { LoginDataType, RegisterDataType } from "../interfaces/user";

export class UserAPI {
    static login = (data: LoginDataType) => axios.post(UsersEndPoints.login, data);

    static me = () => axios.get(UsersEndPoints.me);

    static register = (data: RegisterDataType) => axios.post(UsersEndPoints.register, data);

    static logout = () => axios.get(UsersEndPoints.logout);

    static uploadPhoto = (type: "avatar", photo: CaptureType) => {
        const formData = new FormData();

        formData.append(type, {
            name: "photo",
            type: "image/jpg",
            uri: photo.uri
        });

        return axios.post(UsersEndPoints.uploadAvatar, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    };
}