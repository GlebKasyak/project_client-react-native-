import { combineReducers } from "redux";

import user from "./user.reducer";
import capture from "./capture.reducer";

const rootReducer = combineReducers({
    user,
    capture
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any } > = ReturnType<PropertiesTypes<T>>;

export default rootReducer;