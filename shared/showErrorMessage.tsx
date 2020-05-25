import { showMessage } from "react-native-flash-message";

import { Colors } from "./constants";


export default (message: string) => {
    showMessage({
        message: "Error!",
        description: message,
        type: "danger",
        backgroundColor: Colors.red
    });
};