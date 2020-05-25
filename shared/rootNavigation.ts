import { createRef } from "react";
import { NavigationParams } from "react-navigation";

export const navigationRef = createRef<any>();

export function navigate(name: string, params?: NavigationParams) {
    navigationRef.current?.navigate(name, params);
}