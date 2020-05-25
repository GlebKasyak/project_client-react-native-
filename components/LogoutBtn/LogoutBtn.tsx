import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Spinner from "../Spinner/Spinner";

import { logout, ThunkDispatchUsersType } from "../../store/actions/user.action";
import { Colors, TextStyles } from "../../shared/constants";
import { NavigationScreenType } from "../../interfaces/common";


type Props = {
    dispatch: ThunkDispatchUsersType,
    navigation: NavigationScreenType
};

const LogoutBtn: FC<Props> = ({ dispatch, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);

        await dispatch(logout());
        setIsLoading(false);

        navigation.navigate("Auth");
    }

    return (
       <>
           <Spinner visible={ isLoading } text="Logout..." />
           <TouchableOpacity onPress={ handleClick } >
               <View style={ styles.view } >
                   <Text style={ styles.text } >Logout</Text>
                   <AntDesign name="logout" size={20} color={ Colors.red } />
               </View>
           </TouchableOpacity>
       </>
    );

}
const styles = StyleSheet.create({
    view: {
        marginRight: TextStyles.defaultMargin,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        color: Colors.red,
    },
    text: {
        marginRight: 6,
        fontWeight: "bold",
        color: Colors.red,
        fontSize: TextStyles.mediumText
    }
});

export default connect()(LogoutBtn);