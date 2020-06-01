import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationTabProp } from "react-navigation-tabs";

import { Colors } from "../shared/constants";
import { NavigationConstants } from "../shared/constants";


export default (navigation: NavigationTabProp, focused: boolean) => {
    let iconName;

    switch (navigation.state.routeName) {
        case NavigationConstants.Home:
            iconName = "home";
            break;
        case NavigationConstants.Camera:
            iconName = "camerao";
            break;
        case NavigationConstants.Gallery:
            iconName = "folder1";
            break;
        default:
            iconName = "home";
    };

    const { activeStyle, defaultStyle, commonStyle } = styles;

    return (
        <AntDesign
            name={ iconName }
            style={ [commonStyle, focused ? activeStyle : defaultStyle] }
            size={24}
        />
    )
};

const styles = StyleSheet.create({
    activeStyle: {
        color: Colors.blue
    },
    defaultStyle: {
        color: Colors.black
    },
    commonStyle: {
        paddingTop: 10,
    }
});