import React, { FC, useState, useEffect, useCallback, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text } from "react-native";

import { Toolbar } from "../../components";

import { AppStateType } from "../../store/reducers";
import { captureActions, uploadPhoto } from "../../store/actions/capture.action";
import { CaptureType } from "../../interfaces/capture";
import { NavigationStackProps } from "../../interfaces/common";
import { DoNotAuth } from "../../hoc";

type MapDispatchToProps = {
    addCapture: (payload: CaptureType) => void,
    uploadPhoto: (type: "avatar", photo: CaptureType) => void
}

type Props = NavigationStackScreenProps & MapDispatchToProps;

const CameraScreen: FC<Props> = ({ addCapture, uploadPhoto, navigation }) => {
    const cameraRef = useRef<Camera | null>(null);

    const [focusedScreen, setFocusedScreen] = useState<boolean>(true);
    const [flashMode, setFlashMode] = useState<number>(Camera.Constants.FlashMode.off);
    const [capturing, setCapturing] = useState<boolean>(false);

    const [cameraType, setCameraType] = useState<number>(Camera.Constants.Type.back);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    const setDataOfCamera = useCallback(async () => {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const cameraPermission = (camera.status === "granted" && audio.status === "granted");

        setHasCameraPermission(cameraPermission);
    }, [])

    useEffect(() => {
        setDataOfCamera();
    }, [setDataOfCamera]);

    useEffect(() => {
        const willFocus = navigation.addListener("willFocus", () =>
            setFocusedScreen(true)
        );

        const willBlur = navigation.addListener("willBlur", () =>
            setFocusedScreen(false)
        );

        return () => {
            willFocus.remove();
            willBlur.remove();
        }
    }, []);

    const handleShortCapture = async () => {
        const photoData = await cameraRef.current!.takePictureAsync();
        setCapturing(false);
        addCapture(photoData);
        uploadPhoto("avatar", photoData)
    };

    const handleLongCapture = async () => {
        const videoData = await cameraRef.current!.recordAsync();
        setCapturing(false);
        addCapture(videoData);
    };

    if (hasCameraPermission === null) {
        return <View />;
    };

    if (!hasCameraPermission) {
        return <Text>No access to camera</Text>;
    };

    return ( focusedScreen
            ? (
                <Fragment>
                    <View style={ { flex: 1 } } >
                        <Camera
                            ref={ cameraRef }
                            type={ cameraType }
                            flashMode={ flashMode }
                            style={ { flex: 1 } }
                        />
                    </View>
                    <Toolbar
                        capturing={ capturing }
                        flashMode={ flashMode }
                        cameraType={ cameraType }
                        setFlashMode={ (flashMode: number) => setFlashMode(flashMode) }
                        setCameraType={ (cameraType: number) => setCameraType(cameraType) }
                        onCaptureIn={ () => setCapturing(true) }
                        onCaptureOut={ () => capturing && cameraRef.current!.stopRecording() }
                        onLongCapture={ handleLongCapture }
                        onShortCapture={ handleShortCapture }
                    />
                </Fragment>)
            : <View />)
}

export default compose(
    connect<{}, MapDispatchToProps, {}, AppStateType>(
        null,
        { addCapture: captureActions.addCaptureAC, uploadPhoto }
    ),
    DoNotAuth
)(CameraScreen) as NavigationStackProps<Props>;

