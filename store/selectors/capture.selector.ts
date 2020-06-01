import { AppStateType } from "../reducers";


export class CaptureSelectors {
    static getCaptures = (state: AppStateType) => state.capture.captures;
}