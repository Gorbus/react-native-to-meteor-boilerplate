import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Meteor from 'react-native-meteor';

const {width} = Dimensions.get('window');

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  isValid() {
    const {email, password} = this.state;
    let valid = false;

    if (email.length > 0 && password.length > 0) {
      valid = true;
    }

    if (email.length === 0) {
      this.setState({error: 'You must enter an email address'});
    } else if (password.length === 0) {
      this.setState({error: 'You must enter a password'});
    }

    return valid;
  }

  onSignIn = async () => {
    const {email, password} = this.state;

    if (this.isValid()) {
      try {
        await Meteor.loginWithPassword(email, password);
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

        <TextInput
          style={styles.input}
          onChangeText={password => this.setState({password})}
          placeholder="Mot de passe"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.onSignIn.bind(this)}>
          <Text style={styles.buttonText}>Connectez-vous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.otherText}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherButton}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.otherText}>Mot de passe oublié ?</Text>
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
