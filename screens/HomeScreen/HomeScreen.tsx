import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Text } from "react-native";

import { NavigationProps } from "../../interfaces/common";
import { DoNotAuth } from "../../hoc";

const HomeScreen = () => {
  return (
    <Text>
      Home
    </Text>
  )
}

const composedWithAuthentication = compose(
    connect(),
    DoNotAuth
)(HomeScreen) as NavigationProps<any>;

export default composedWithAuthentication;