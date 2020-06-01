import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Video } from "expo-av";

type Props = {
    uri: string
}

const VideoComponent: FC<Props> = ({ uri }) => (
    <Video
        style={ styles.video }
        source={{ uri }}
        rate={1.0}
        volume={1.0}
        useNativeControls={ true }
    />
);

const styles = StyleSheet.create({
    video: {
        width: "100%",
        height: "100%"
    }
});

export default VideoComponent;