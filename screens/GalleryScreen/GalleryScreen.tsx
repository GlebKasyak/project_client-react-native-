import React, { FC } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { View, Image, ScrollView, StyleSheet } from "react-native";

import { Video } from "../../components";

import { AppStateType } from "../../store/reducers";
import { CaptureSelectors } from "../../store/selectors";
import { CaptureType } from "../../interfaces/capture";
import { NavigationStackProps } from "../../interfaces/common";
import { getFileExtension } from "../../shared/helpres";
import { DoNotAuth } from "../../hoc";

type MapStateToProps = {
    captures: Array<CaptureType>
}

const GalleryScreen: FC<MapStateToProps> = ({ captures }) => (
    <ScrollView
        horizontal={ false }
        contentContainerStyle={ styles.scrollView }
    >
        { captures.map(({ uri }) => (
            <View style={ styles.galleryImageContainer } key={ uri } >
                { setWrapperForFile(uri) }
            </View>
        )) }
    </ScrollView>
);

const setWrapperForFile = (uri: string) => {
    const ext = getFileExtension(uri);
    switch (ext) {
        case "jpg":
            return <Image source={{ uri }} style={ styles.galleryImage } />;
        case "mp4":
            return <Video uri={ uri } />;
    }
};

const styles = StyleSheet.create({
    scrollView: {
        display: "flex",
        alignItems: "center"
    },
    galleryImageContainer: {
        width: "65%",
        height: 250,
        marginVertical: 10
    },
    galleryImage: {
        width: "100%",
        height: "100%"
    }
})

export default compose(
    connect<MapStateToProps, {}, {}, AppStateType>(
        state => ({ captures: CaptureSelectors.getCaptures(state) })
    ),
    DoNotAuth
)(GalleryScreen) as NavigationStackProps<MapStateToProps>;