import { createStackNavigator } from "react-navigation-stack";

import { LoginScreen, RegisterScreen } from "../screens";
import { NavigationConstants } from "../shared/constants";

export default createStackNavigator({
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
}, {
    initialRouteName: NavigationConstants.Login
});
