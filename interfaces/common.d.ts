import React, { Dispatch, FC, SetStateAction } from "react";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { NavigationStackOptions, NavigationStackScreenProps } from "react-navigation-stack";

export interface ResponseType {
    message?: string,
    success: boolean,
    err?: Error,
}

export namespace Handlers {
    type SubmitType = (e: SubmitTypes) => Promise<void> | void;
    type ChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;
    type ClickType = (e: React.MouseEvent<HTMLButtonElement>) => void;

    type SubmitTypes =
        | React.FormEvent<HTMLFormElement>
        | React.KeyboardEvent<HTMLTextAreaElement>
        | React.MouseEvent<HTMLElement, MouseEvent>

}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;

export interface IDbDocumentType {
    _id: string,
    createdAt?: string,
    updatedAt?: string
}

export type NavigationProps<P> = FC<P & NavigationStackScreenProps> & { navigationOptions: NavigationStackOptions | ((props: NavigationStackScreenProps) => NavigationStackOptions) };
export type NavigationScreenType = NavigationScreenProp<NavigationState, NavigationParams>