import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { HomeScreen, CameraScreen, GalleryScreen } from "../screens";

import { Colors, TextStyles } from "../shared/constants";
import { defaultAppNavigationOptions } from "../shared";
import getTabBarIcon from "../shared/getTabBarIcon";

const Home = createStackNavigator({
    Home: { screen: HomeScreen }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        ...defaultAppNavigationOptions(navigation)
    })
});

const Camera = createStackNavigator({
    Camera: { screen: CameraScreen }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        ...defaultAppNavigationOptions(navigation)
    })
});

const Gallery = createStackNavigator({
    Gallery: { screen: GalleryScreen }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        ...defaultAppNavigationOptions(navigation)
    })
});

export default createBottomTabNavigator({
    Home,
    Camera,
    Gallery
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => getTabBarIcon(navigation, focused),
        tabBarOptions: {
            activeTintColor: Colors.blue,
            inactiveTintColor: Colors.black,
            style: {
                height: 70,
                borderTopWidth: 2,
                borderTopColor: Colors.blue
            },
            labelStyle: {
                fontSize: TextStyles.mediumText,
                paddingBottom: 7,
            }
        }
    })
});
