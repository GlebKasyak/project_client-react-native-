import axios from "axios";

import { UsersEndPoints } from "../shared/constants/api.contsnts";
import { LoginDataType, RegisterDataType } from "../interfaces/user";

export class UserAPI {
    static login = (data: LoginDataType) => axios.post(UsersEndPoints.login, data);

    static me = () => axios.get(UsersEndPoints.me);

    static register = (data: RegisterDataType) => axios.post(UsersEndPoints.register, data);

    static logout = () => axios.get(UsersEndPoints.logout);
}