// app/index.js
import React, {Component, createContext} from 'react';
import Meteor, {withTracker} from 'react-native-meteor';
const SERVER_URL = 'ws://localhost:3000/websocket';

import HomeScreen from './src/HomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './src/accounts/SignIn';
import SignUpScreen from './src/accounts/SignUp';
import ResetPassword from './src/accounts/ResetPassword';

Meteor.connect(SERVER_URL);

const Stack = createStackNavigator();
export const UserContext = createContext();

class App extends Component {
  render() {
    const {user} = this.props;
    console.log(user);
    return (
      <UserContext.Provider value={{user}}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{title: 'Connexion'}}
              />
              <Stack.Screen
                name="SignUp"
                options={{title: 'Créer un compte'}}
                component={SignUpScreen}
              />
              <Stack.Screen
                name="ResetPassword"
                options={{title: 'Mot de passe oublié'}}
                component={ResetPassword}
              />
            </>
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    );
  }
}

const AppWithTracker = withTracker(params => {
  return {
    user: Meteor.user(),
  };
})(App);

export default () => (
  <NavigationContainer>
    <AppWithTracker />
  </NavigationContainer>
);
