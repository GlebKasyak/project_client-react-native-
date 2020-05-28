import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native"
import { Icon, Input } from "@ui-kitten/components";
import { Colors, TextStyles } from "../../shared/constants";

type Props = {
    value: string,
    onChange: (value: string) => void,
    fieldName: string,
    iconName: string,
    error?: string,
    secureTextEntry?: boolean
}

const TextField: FC<Props> = ({ value, onChange, fieldName, iconName, error, ...props }) => (
    <View style={ styles.view } >
        <Input
            value={ value }
            onChangeText={ onChange }
            accessoryRight={ props => <Icon { ...props } name={ iconName } /> }
            label={ () => <Text style={ styles.label } >{ fieldName }</Text> }
            placeholder={ `Enter ${ fieldName }` }
            size="large"
            style={ error ? styles.inputError : styles.view }
            { ...props }
        />
        { !!error && <Text style={ styles.error } >{ error }</Text> }
    </View>
);

const styles = StyleSheet.create({
    view: {
        width: "100%"
    },
    label: {
        paddingVertical: 5,
        fontSize: TextStyles.mediumText,
        color: Colors.blue
    },
    error: {
        color: Colors.red
    },
    inputError: {
        borderColor: Colors.red
    }
});

export default TextField;