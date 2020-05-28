import React, { useEffect, FC } from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { AsyncStorage } from "react-native";

import { StorageKeys } from "../shared/constants/commons";
import { NavigationConstants } from "../shared/constants";

const WithAuthRedirect = <P extends NavigationStackScreenProps>(Component: FC<P>) => {
    const RedirectComponent: FC<P> = props=> {

        useEffect(() => {
            const checkAuth = async () => {
                let isAuth = await AsyncStorage.getItem(StorageKeys.isAuth);

                if(isAuth && JSON.parse(isAuth)) {
                    props.navigation.navigate(NavigationConstants.App);
                }
            };
            checkAuth();
        }, [props.navigation]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = `WithAuthRedirect`;
    return RedirectComponent;
};

export default WithAuthRedirect;