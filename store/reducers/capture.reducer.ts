import { Reducer } from "redux";

import * as captureTypes from "../types/captureTypes";
import { captureActions } from "../actions/capture.action";
import { CaptureType } from "../../interfaces/capture";
import { InferActionsTypes } from "./index";

type StateType = {
    captures: Array<CaptureType>
}

const initialState: StateType = {
    captures: []
};

type ActionsTypes = InferActionsTypes<typeof captureActions>;

const reducer: Reducer<StateType, ActionsTypes> = (state = initialState, action: ActionsTypes ): StateType => {
    switch (action.type) {
        case captureTypes.ADD_CAPTURE:
            return {
                captures: [action.payload, ...state.captures]
            };
        default:
            return state;
    }
};

export default reducer;