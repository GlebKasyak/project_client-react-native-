import * as captureTypes from "../types/captureTypes";
import { ThunkAction } from "redux-thunk";

import { UserAPI } from "../../apiServices/userAPI";
import { CaptureType } from "../../interfaces/capture";
import { AppStateType, InferActionsTypes } from "../reducers";
import { userActions } from "./user.action";


export const captureActions = {
    addCaptureAC: (payload: CaptureType) => ({ type: captureTypes.ADD_CAPTURE, payload } as const),
};

type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof userActions>>;

export const uploadPhoto = (type: "avatar", photo: CaptureType): ThunkActionType<void> => async dispatch => {
    const response = await  UserAPI.uploadPhoto(type, photo);
    const { success, data } = response.data;
};