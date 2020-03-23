import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Meteor, {Accounts} from 'react-native-meteor';

const {width} = Dimensions.get('window');

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  isValid() {
    const {email} = this.state;
    let valid = false;

    if (email.length > 0) {
      valid = true;
    }

    if (email.length === 0) {
      this.setState({error: 'You must enter an email address'});
    }

    return valid;
  }

  onResetPassword = async () => {
    const {email} = this.state;

    if (this.isValid()) {
      try {
        await Meteor.loginWithPassword(email);
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({email})}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={this.onResetPassword}>
          <Text style={styles.buttonText}>Send Reset Password Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.otherText}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.otherText}>
            Vous vous en souvenez ? Connectez-vous!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const ELEMENT_WIDTH = width - 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: ELEMENT_WIDTH,
    fontSize: 16,
    height: 36,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#888888',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3B5998',
    width: ELEMENT_WIDTH,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  otherText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
  },
  otherButton: {
    marginTop: 6,
  },
});

export default SignIn;
