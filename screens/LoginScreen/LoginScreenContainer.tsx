import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { AsyncStorage } from "react-native";

import LoginScreen from "./LoginScreen";
import { RightStackNavigation } from "../../components";

import { Auth } from "../../hoc";
import { UserSelectors } from "../../store/selectors"
import { login, ThunkDispatchUsersType } from "../../store/actions/user.action";
import { AppStateType } from "../../store/reducers";

import { ResponseType, NavigationProps } from "../../interfaces/common";
import { rememberMe, errorMessage } from "../../shared";
import { IUser, LoginDataType } from "../../interfaces/user";
import { Colors, NavigationConstants } from "../../shared/constants";
import { StorageKeys } from "../../shared/constants/commons";


type MapStateToPropsType = {
    user: IUser
};

type MapDispatchToPropsType = {
    login: (data: LoginDataType) => Promise<ResponseType>
};

type Props = MapStateToPropsType & MapDispatchToPropsType & NavigationStackScreenProps;

const LoginScreenContainer: FC<Props> = ({ navigation, user, login }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        rememberMe(checked, { email, password });

        const res = await login({ email, password, count: 0 });

        if(!res.success) {
            errorMessage(res.message!)
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const setAuthData = async () => {
            await AsyncStorage.setItem(StorageKeys.isAuth, JSON.stringify(user.isAuth));

            setEmail("");
            setPassword("");
            setIsLoading(false);
            navigation.navigate(NavigationConstants.App);
        };

        user.isAuth && setAuthData();
    }, [user.isAuth]);

    useEffect(() => {
        const setFormData = async () => {
            const data = await AsyncStorage.getItem(StorageKeys.isRememberMe);

            if(data) {
                const { email, password } = JSON.parse(data);

                setEmail(email);
                setPassword(password);
                setChecked(true);
            }
        };

        setFormData();
    }, [])

    return <LoginScreen
        isLoading={ isLoading }
        email={ email }
        password={ password }
        checked={ checked }
        setEmail={ setEmail }
        setPassword={ setPassword }
        setChecked={ setChecked }
        onSubmit={ handleSubmit }
    />
};

const mapDispatchToProps = (dispatch: ThunkDispatchUsersType) => ({
    login: (data: LoginDataType) => dispatch(login(data)),
});

const composedWithAuthentication = compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
        state => ({ user: UserSelectors.getUser(state) }),
        mapDispatchToProps
    ),
    Auth
)(LoginScreenContainer) as NavigationProps<Props>;

composedWithAuthentication.navigationOptions = ({ navigation }) => ({
    title: "Login",
    headerTintColor: Colors.blue,
    headerTitleStyle: {
        fontWeight: "bold",
    },
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    },
    headerRight: () => (
        <RightStackNavigation
            navigation={ navigation }
            screen={ NavigationConstants.Register }
            nameScreen={ NavigationConstants.Register }
        />
    )
});

export default composedWithAuthentication;