import React from "react";

import { LogoutBtn } from "../components";

import { StackNavigationType } from "../interfaces/common";
import { Colors } from "./constants";

export default  (navigation: StackNavigationType) => ({
    headerRight: () => ( <LogoutBtn navigation={ navigation } /> ),
    headerTintColor: Colors.blue,
    headerStyle: {
        elevation: 10
    }
});