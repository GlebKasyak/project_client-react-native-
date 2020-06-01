import { CameraCapturedPicture } from "expo-camera";

type VideoCapture = { uri: string };

export type CaptureType = CameraCapturedPicture | VideoCapture;