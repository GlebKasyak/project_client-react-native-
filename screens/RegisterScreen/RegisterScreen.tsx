import React, { FC } from "react";

import { Container, Spinner, TextField } from "../../components";

import { TextStyles } from "../../shared/constants";
import { Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { FieldNameTypes } from "../../shared/validation/validate";
import { FormDataType } from "./initialFormData";

type Props = {
        formData: FormDataType,
        isLoading: boolean,
        onChange: (value: string, name: FieldNameTypes) => void,
        onSubmit: () => void
};

const RegisterScreen: FC<Props> = ({ formData, isLoading, onChange, onSubmit }) => (
    <Container>
        <Spinner visible={ isLoading } text="Registration. Please wait..." />
        <TextField
            value={ formData.firstName.value }
            onChange={ (value: string) => onChange(value, "firstName") }
            error={ formData.firstName.error }
            iconName="person-outline"
            fieldName="FirstName"
        />
        <TextField
            value={ formData.secondName.value }
            onChange={ (value: string) => onChange(value, "secondName") }
            error={ formData.secondName.error }
            iconName="person-outline"
            fieldName="SecondName"
        />
        <TextField
            value={ formData.email.value }
            onChange={ (value: string) => onChange(value, "email") }
            error={ formData.email.error }
            iconName="email-outline"
            fieldName="Email"
        />
        <TextField
            value={ formData.password.value }
            onChange={ (value: string) => onChange(value, "password") }
            error={ formData.password.error }
            iconName="lock-outline"
            fieldName="Password"
            secureTextEntry
        />
        <TextField
            value={ formData.confirmPassword.value }
            onChange={ (value: string) => onChange(value, "confirmPassword") }
            error={ formData.confirmPassword.error }
            iconName="lock-outline"
            fieldName="Confirm password"
            secureTextEntry
        />
        <Button onPress={ onSubmit } style={ styles.button } size="large" >
            Register
        </Button>
    </Container>
);

const styles = StyleSheet.create({
        button: {
                width: "100%",
                marginTop: TextStyles.defaultMargin,
                height: 30
        }
});

export default RegisterScreen;