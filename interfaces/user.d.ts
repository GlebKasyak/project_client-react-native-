import { IDbDocumentType } from "./common";

export interface UserState {
    user: IUser
}

export interface IUser extends IDbDocumentType{
    firstName: string,
    secondName: string,
    email: string,
    avatar: string,
    password?: string,
    isAuth?: boolean
    isOnline: boolean,
    status: string,
    friends: Array<this | string>
}

export type LoginDataType = {
    email: string,
    password: string,
    captcha?: string
    count: number
}

export type RegisterDataType = {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}

