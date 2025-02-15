import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { Spinner } from '../common';
import {
  NAVIGATION_ACCOUNT_STACK_PATH,
  NAVIGATION_LOGIN_STACK_PATH,
} from '../../navigation/routes';
import { magento } from '../../magento';
import { logError } from '../../helper/logger';
import { ThemeContext } from '../../theme';


class AuthLoading extends Component {
  static contextType = ThemeContext;

  constructor() {
    super();
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    try {
      const customerToken = await AsyncStorage.getItem('customerToken');
      magento.setCustomerToken(customerToken);

      this.props.navigation.navigate(
        customerToken
          ? NAVIGATION_ACCOUNT_STACK_PATH
          : NAVIGATION_LOGIN_STACK_PATH,
      );
    } catch (e) {
      logError(e);
      // TODO: add error screen via switch navigation
      this.props.navigation.navigate(NAVIGATION_LOGIN_STACK_PATH);
    }
  };

  render() {
    const theme = this.context;
    return (
      <View style={styles.container(theme)}>
        <Spinner />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
  }),
});

export default AuthLoading;
