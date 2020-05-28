import React from "react";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";

import { store } from "./store"
import apiServices from "./apiServices";
apiServices(store);

import App from "./App/App";

YellowBox.ignoreWarnings(["Remote debugger"]);

export default () => (
    <Provider store={ store } >
        <App />
    </Provider>
)



