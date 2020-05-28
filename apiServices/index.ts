import axios from "axios";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";

import { userActions } from "../store/actions/user.action";
import { StoreType } from "../store";
import { StorageKeys } from "../shared/constants/commons";

const { manifest } = Constants;

export default (store: StoreType) => {
    axios.defaults.baseURL = "http://" + manifest.debuggerHost!.split(`:`).shift()!.concat(":3333/api/");

    axios.interceptors.request.use(async config => {
        const authData = await AsyncStorage.getItem(StorageKeys.token);
        config.headers.Authorization = !!authData && `Bearer ${ JSON.parse(authData).token }`;

        return config;
    }, async err => err);

    axios.interceptors.response.use(res => res,
        async ({ response }) => {
            switch (response.status) {
                case 401:
                    if(!await AsyncStorage.getItem(StorageKeys.isAuth)) {
                        return Promise.reject(response.data);
                    }

                    await AsyncStorage.removeItem(StorageKeys.isAuth);
                    await AsyncStorage.removeItem(StorageKeys.token);

                    store.dispatch(userActions.logoutAC());
                default:
                    return Promise.reject(response.data);
            }
        });
}
