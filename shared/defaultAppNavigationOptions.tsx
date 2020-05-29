import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { LogoutBtn } from "../components";

import { Colors } from "./constants";

export default  ({ navigation }: any) => ({
    headerRight: () => ( <LogoutBtn navigation={ navigation } /> ),
    headerTintColor: Colors.blue,
    headerStyle: {
        elevation: 10
    }
});