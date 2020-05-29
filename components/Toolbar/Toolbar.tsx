import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";

import { Colors, Classes } from "../../shared/constants";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

type Props = {
    capturing: boolean,
    flashMode: number,
    cameraType: number,
    setFlashMode: (flashMode: number) => void,
    setCameraType: (cameraType: number) => void,
    onCaptureIn: () => void,
    onCaptureOut: () => void,
    onLongCapture: () => Promise<void>,
    onShortCapture: () => Promise<void>
}

const Toolbar: FC<Props> = (
    {
        capturing,
        cameraType,
        flashMode,
        setFlashMode,
        setCameraType,
        onCaptureIn,
        onCaptureOut,
        onLongCapture,
        onShortCapture
    }) => {

    const setFleshModeHandler = () => {
        setFlashMode(flashMode === CameraFlashModes.on
            ? CameraFlashModes.off
            : CameraFlashModes.on
        )
    };

    const setCameraTypeHandler = () => {
        setCameraType(cameraType === CameraTypes.back
            ? CameraTypes.front
            : CameraTypes.back
        )
    };

    return (
        <Grid style={ styles.bottomToolbar }>
            <Row>
                <Col style={ styles.center } >
                    <TouchableOpacity onPress={ setFleshModeHandler } >
                        <Ionicons
                            name={ flashMode === CameraFlashModes.on ? "md-flash" : "md-flash-off" }
                            color={ Colors.white }
                            size={30}
                        />
                    </TouchableOpacity>
                </Col>
                <Col size={2} style={ styles.center } >
                    <TouchableWithoutFeedback
                        onPressIn={ onCaptureIn }
                        onPressOut={ onCaptureOut }
                        onLongPress={ onLongCapture }
                        onPress={ onShortCapture }
                    >
                        <View style={ [styles.captureBtn, capturing && styles.captureBtnActive] }>
                            { capturing && <View style={ styles.captureBtnInternal } /> }
                        </View>
                    </TouchableWithoutFeedback>
                </Col>
                <Col style={ styles.center } >
                    <TouchableOpacity onPress={ setCameraTypeHandler }>
                        <Ionicons
                            name="md-reverse-camera"
                            color={ Colors.white }
                            size={30}
                        />
                    </TouchableOpacity>
                </Col>
            </Row>
        </Grid>
    )
};

const { width: winWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
    center: Classes.center,
    bottomToolbar: {
        width: winWidth,
        position: "absolute",
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: Colors.white,
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: Colors.red,
        borderColor: "transparent",
    },
});

export default Toolbar;