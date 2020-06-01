import React, { FC } from "react";
import { Button, CheckBox } from "@ui-kitten/components";
import { StyleSheet, View, Text } from "react-native";

import { Container, Spinner, TextField } from "../../components";

import { SetStateType } from "../../interfaces/common";
import { Colors, TextStyles } from "../../shared/constants";

type Props = {
    isLoading: boolean,
    email: string,
    password: string,
    checked: boolean,
    setEmail: SetStateType<string>,
    setPassword: SetStateType<string>,
    setChecked: SetStateType<boolean>,
    onSubmit: () => Promise<void>
};

const LoginScreen: FC<Props> = (
    {
        isLoading,
        email,
        password,
        checked,
        setEmail,
        setPassword,
        setChecked,
        onSubmit,
    }) =>  (
    <Container>
        <Spinner visible={ isLoading } text="Authorization...Please wait" />
        <TextField
            value={ email }
            onChange={ (value: string) => setEmail(value) }
            fieldName="Email"
            iconName="email-outline"
        />
        <TextField
            value={ password }
            onChange={ (value: string) => setPassword(value) }
            fieldName="Password"
            iconName="lock-outline"
            secureTextEntry
        />
        <View style={ styles.rememberMe } >
            <CheckBox
                status="primary"
                checked={ checked }
                onChange={ nextChecked => setChecked(nextChecked) }
            />
            <Text style={ styles.text } >Remember me</Text>
        </View>
        <Button onPress={ onSubmit } style={ styles.button } size="large" disabled={ !email || !password } >
            Sign in
        </Button>
    </Container>
)

const styles = StyleSheet.create({
    button: {
        width: "100%",
        marginTop: TextStyles.defaultMargin,
        height: 30
    },
    rememberMe: {
        marginTop: 8,
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        color: Colors.black
    },
    text: {
        fontSize: TextStyles.largeText,
        color: Colors.black,
        marginLeft: 8
    },
    label: {
        paddingVertical: 5,
        fontSize: TextStyles.mediumText,
        color: Colors.blue
    }
});

export default LoginScreen;