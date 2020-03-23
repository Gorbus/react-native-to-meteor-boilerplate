import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {UserContext} from './../App';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Meteor from 'react-native-meteor';

const HomeScreen = ({navigation, route}) => {
  const context = useContext(UserContext);
  console.log(context);

  const logout = async () => {
    await Meteor.logout();
  };
  return (
    <View style={styles.homeScreen}>
      <Text>Connected User</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default HomeScreen;
