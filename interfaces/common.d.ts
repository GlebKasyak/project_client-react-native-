import { Dispatch, FC, SetStateAction } from "react";
import { NavigationParams, NavigationRoute, NavigationScreenProp, NavigationState } from "react-navigation";
import { NavigationStackOptions, NavigationStackScreenProps } from "react-navigation-stack";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { NavigationBottomTabOptions, NavigationTabScreenProps } from "react-navigation-tabs";


export interface ResponseType {
    message?: string,
    success: boolean,
    err?: Error,
}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;

export interface IDbDocumentType {
    _id: string,
    createdAt?: string,
    updatedAt?: string
}

export type NavigationStackProps<P> = FC<P & NavigationStackScreenProps> & { navigationOptions: NavigationStackOptions | ((props: NavigationStackScreenProps) => NavigationStackOptions) };
export type NavigationTabProps<P> = FC<P & NavigationTabScreenProps> & { navigationOptions: NavigationBottomTabOptions | ((props: NavigationTabScreenProps) => NavigationBottomTabOptions) };
export type NavigationScreenType = NavigationScreenProp<NavigationState, NavigationParams>;

export type StackNavigationType = StackNavigationProp<NavigationRoute<NavigationParams>, NavigationParams>;


