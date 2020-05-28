import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AsyncStorage } from "react-native";

import * as userTypes from "../types/userTypes";
import { UserAPI } from "../../apiServices/userAPI";
import { AppStateType, InferActionsTypes } from "../reducers";
import { StorageKeys } from "../../shared/constants/commons";

import { ResponseType } from "../../interfaces/common";
import { IUser, LoginDataType } from "../../interfaces/user";


export const userActions = {
    loginAC: (payload: IUser) => ({ type: userTypes.LOGIN_USER, payload } as const),
    logoutAC: () => ({ type: userTypes.LOGOUT_USER } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof userActions>>;
export type ThunkDispatchUsersType = ThunkDispatch<AppStateType, unknown, InferActionsTypes<typeof userActions>>;


export const getAuthUserData = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.me();
    const { success, data } = response.data;

    if(success) dispatch(userActions.loginAC(data!));
};

export const login = (newData: LoginDataType): ThunkActionType<ResponseType> => async dispatch => {
    try {
        const response = await UserAPI.login(newData);
        const { success, data, message } = response.data;
        if(success) {
            await AsyncStorage.setItem(StorageKeys.token, JSON.stringify({ token: data }))
            dispatch(getAuthUserData());

            return { success, message };
        }
    } catch (err) {
        return err
    }
};

export const logout = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.logout();

    const { success } = response.data;
    if(success) {
        await AsyncStorage.removeItem(StorageKeys.isAuth);
        await AsyncStorage.removeItem(StorageKeys.token);

        dispatch(userActions.logoutAC());
    }
};