import * as captureTypes from "../types/captureTypes";

import { CaptureType } from "../../interfaces/capture";


export const captureActions = {
    addCaptureAC: (payload: CaptureType) => ({ type: captureTypes.ADD_CAPTURE, payload } as const),
};
