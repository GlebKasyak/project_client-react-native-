import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavigationStackScreenProps } from "react-navigation-stack";

import RegisterScreen from "./RegisterScreen";

import { Auth } from "../../hoc";
import { UserAPI } from "../../apiServices/userAPI";
import { NavigationProps } from "../../interfaces/common";
import { NavigationConstants } from "../../shared/constants";
import { Colors } from "../../shared/constants";
import { errorMessage } from "../../shared";
import { getInputValidationState, FieldNameTypes } from "../../shared/validation/validate";
import { FormDataType, initialFormData } from "./initialFormData";


const RegisterScreenContainer = ({ navigation }: NavigationStackScreenProps) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (value: string, name: FieldNameTypes) => {
        setFormData({
            ...formData,
            [name]: getInputValidationState({
                input: formData[name],
                value
            })
        });
    };

    const handleSubmit = async () => {
        const updatedInputs = {} as FormDataType;

        for (const key in formData) {
            updatedInputs[formData[key as FieldNameTypes].name] = getInputValidationState({
                input: formData[key as FieldNameTypes],
                value: formData[key as FieldNameTypes].value
            }) as any;
        };

        setFormData(updatedInputs);

        if(Object.values(updatedInputs).some(field => !field.error)) {
            setIsLoading(true);

           try {
               await UserAPI.register({
                   firstName: formData.firstName.value,
                   secondName: formData.secondName.value,
                   email: formData.email.value,
                   password: formData.password.value,
               });

               setFormData(initialFormData);
               setIsLoading(false);
               navigation.navigate(NavigationConstants.Login)
           } catch(err) {
               setIsLoading(false);
               errorMessage(err.message);
           }
        }
    }

    return <RegisterScreen
        isLoading={ isLoading }
        formData={ formData }
        onChange={ handleChange }
        onSubmit={ handleSubmit }
    />
}

const composedWithAuthentication = compose(
    connect(),
    Auth
)(RegisterScreenContainer) as NavigationProps<any>;

composedWithAuthentication.navigationOptions = () => ({
    headerTintColor: Colors.blue,
});

export default composedWithAuthentication;