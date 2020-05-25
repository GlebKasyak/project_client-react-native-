import { Reducer } from "redux";

import * as userTypes from "../types/userTypes";
import { userActions } from "../actions/user.action";
import { UserState } from "../../interfaces/user";
import { exhaustiveCheck } from "../../shared/helpres";
import { InferActionsTypes } from "./index";

const initialState: UserState = {
    user: {
        firstName: "",
        secondName: "",
        email: "",
        avatar: "",
        _id: "",
        createdAt: "",
        isAuth: false,
        isOnline: false,
        status: "",
        friends: []
    }
};

type ActionsTypes = InferActionsTypes<typeof userActions>;

const reducer: Reducer<UserState, ActionsTypes> = (state = initialState, action: ActionsTypes ): UserState => {
    switch (action.type) {
        case userTypes.LOGIN_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                    isAuth: true
                }
            };
        case userTypes.LOGOUT_USER:
            return {
                ...state,
                user: { ...initialState.user, isAuth: false }
            };
        default:
            exhaustiveCheck(action);
            return state;
    }
};

export default reducer;