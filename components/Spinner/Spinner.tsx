import React, { FC } from "react"
import { StyleSheet } from "react-native";
import { Colors, TextStyles } from "../../shared/constants";
import Spinner from "react-native-loading-spinner-overlay";

type Props = {
  visible: boolean,
  text: string
}

const SpinnerComponent: FC<Props> = ({ visible, text }) =>
    <Spinner
        visible={ visible }
        size="large"
        color={ Colors.blue }
        textContent={ text }
        textStyle={ styles.spinnerStyle }
    />;


const styles = StyleSheet.create({
  spinnerStyle: {
    fontSize: TextStyles.largeText,
    color: Colors.blue
  }
});

export default SpinnerComponent;