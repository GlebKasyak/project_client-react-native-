import React, { FC } from "react"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { Colors, TextStyles } from "../../shared/constants";
import { NavigationScreenType } from "../../interfaces/common";

type Props = {
    navigation: NavigationScreenType,
    screen: string,
    nameScreen: string
}

const RightStackNavigation: FC<Props> = ({ navigation, screen, nameScreen }) => (
    <TouchableOpacity onPress={ () => navigation.navigate(screen) } >
        <View style={ styles.view } >
            <Text style={ styles.text } >{ nameScreen }</Text>
            <Entypo name="chevron-with-circle-right" size={24} color={ Colors.blue } />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    view: {
        marginRight: TextStyles.defaultMargin,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        color: Colors.blue,
    },
    text: {
        marginRight: 6,
        fontWeight: "bold",
        color: Colors.black
    }
});


export default RightStackNavigation;