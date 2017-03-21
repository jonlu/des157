//@flow
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../common/Input';
import {Button, Spinner} from '../common';
import Firebase from '../common/Firebase';

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };
  onButtonPress() {
    const {email, password} = this.state;
    this.setState({error: '', loading: true});

    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch( () => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch (this.onLoginFail.bind(this));
      });
  }
  onLoginFail() {
    this.setState({
      error:'Authentication failed.',
      loading: false
    });
  }
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }
  renderButton() {
    if (this.state.loading) {
      return (
        <Button>
           <Spinner size="small" />
        </Button>
      );
    }
    return (
      <Button pressed={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render () {
    return (
      // <LinearGradient colors={['#EECDA3', '#EF629B']} style={styles.formStyle}>
      <LinearGradient colors={['#43D2A9', '#137CBF']} style={styles.formStyle}>
        <View style={styles.titleStyle}>
          <Text style={styles.headerStyle}>WalkSafe</Text>
          <Text style={styles.subtitleStyle}>*This is a prototype</Text>
          <Text style={styles.subtitleStyle}>Some links may not work</Text>
        </View>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <Input
            placeholder="user@example.com"
            autoCorrect={false}
            value = {this.state.email}
            onChangeText={email=>this.setState({email})}
            label="Email:"
          />
        <Input
          placeholder="password"
          autoCorrect={false}
          secureTextEntry={true}
          value = {this.state.password}
          onChangeText={password=>this.setState({password })}
          label="Password:"
        />

        {this.renderButton()}
      </LinearGradient>
    );
  }
}


const styles = {
  formStyle : {
    height: '100%',
    alignItems: 'center',

  },
  titleStyle: {
    height: '50%',
    paddingTop: '20%',
    alignItems: 'center',
    position: 'relative'
  },
  headerStyle: {
    fontFamily: 'AppleSDGothicNeo-UltraLight',
    fontSize: 40,
    color: '#FFF',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width:0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  subtitleStyle: {
    fontFamily: 'AppleSDGothicNeo-UltraLight',
    color: '#FFF',
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  errorTextStyle : {
    fontSize: 16,
    height: 16,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: 'transparent',
    position: 'relative'
  }
}
