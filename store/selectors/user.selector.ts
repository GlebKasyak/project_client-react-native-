import { AppStateType } from "../reducers";


export class UserSelectors {
    static getUser = (state: AppStateType) => state.user.user;

    static getUserIsAuth = (state: AppStateType) => state.user.user.isAuth;

    static getUserId = (state: AppStateType) => state.user.user._id;
}