import React, { ComponentType, useEffect } from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { AsyncStorage } from "react-native";

import { StorageKeys } from "../shared/constants/commons";
import { NavigationConstants } from "../shared/constants";


const WithDoNotAuthRedirect = <P extends NavigationStackScreenProps>(Component: ComponentType<P>) => {
     const RedirectComponent = (props: P) => {
        useEffect(() => {
            const checkAuth = async () => {
                let isAuth = await AsyncStorage.getItem(StorageKeys.isAuth);

                if(!isAuth || !JSON.parse(isAuth)) {
                    props.navigation.navigate(NavigationConstants.Auth);
                }
            };
            checkAuth();
        }, [props.navigation]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = "WithDoNotAuthRedirect";
    return RedirectComponent;
};

export default WithDoNotAuthRedirect;