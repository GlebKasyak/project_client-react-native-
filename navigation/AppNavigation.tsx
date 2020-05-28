import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { HomeScreen } from "../screens";
import { NavigationConstants } from "../shared/constants";
import { LogoutBtn } from "../components";


export default createStackNavigator({
    Home: { screen: HomeScreen },
}, {
    initialRouteName: NavigationConstants.Home,
    defaultNavigationOptions: ({ navigation }) => ({
        headerRight: () => ( <LogoutBtn navigation={ navigation } /> )
    })
});
