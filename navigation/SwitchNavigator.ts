import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { NavigationConstants } from "../shared/constants";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";

const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigation,
        App: AppNavigation
    },
    {
        initialRouteName: NavigationConstants.Auth
    }
)

export default createAppContainer(SwitchNavigator);