import React, { useEffect, useCallback, FC } from "react"
import { connect } from "react-redux";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { light as lightTheme, mapping } from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { AsyncStorage } from "react-native";

import { SwitchNavigator } from "../navigation";

import { UserSelectors } from "../store/selectors";
import { getAuthUserData } from "../store/actions/user.action";
import { AppStateType } from "../store/reducers";
import { StorageKeys } from "../shared/constants/commons";
import { navigationRef } from "../shared/rootNavigation";


type MapStateToProps = {
    isAuth?: boolean
}

type MapDispatchToProps = {
    getAuthUserData: () => void
}

type Props = MapStateToProps & MapDispatchToProps;

const App: FC<Props> = ({ isAuth, getAuthUserData }) => {

    const authCheck = useCallback(async () => {
        const authData = await AsyncStorage.getItem(StorageKeys.isAuth);

        if(!!authData && JSON.parse(authData)) {
            getAuthUserData();
        }
    }, [isAuth, getAuthUserData]);

    useEffect(() => {
        authCheck();
    }, [isAuth, authCheck]);


    return (
        <>
            <IconRegistry icons={ EvaIconsPack } />
            <ApplicationProvider mapping={ mapping } theme={ lightTheme } >
                <NavigationContainer ref={ navigationRef } >
                    <SwitchNavigator />
                </NavigationContainer>
                <FlashMessage position="top" icon="danger" />
            </ApplicationProvider>
        </>
    )
};

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    state => ({ isAuth: UserSelectors.getUserIsAuth(state) }),
    { getAuthUserData }
)(App)