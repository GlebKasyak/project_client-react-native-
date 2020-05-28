import { StorageKeys } from "./constants/commons";
import { AsyncStorage } from "react-native";


type Data = {
    password: string,
    email: string
}

export default async (isRememberMe: boolean, data: Data) => {
    if(isRememberMe) {
        await AsyncStorage.setItem(StorageKeys.isRememberMe, JSON.stringify(data));
    } else {
        await AsyncStorage.removeItem(StorageKeys.isRememberMe);
    }
};