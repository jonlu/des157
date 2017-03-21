import React, { Component } from 'react';
import { AppRegistry,View,Text } from 'react-native';
import Firebase from './components/common/Firebase';
import LoginForm from './components/views/LoginForm';
import App from './components/views/App'
import Map from './components/screens/Map';
import {Actions} from 'react-native-router-flux';

class main extends Component {
  state = {loggedIn : null}
  componentWillMount() {



    Firebase.auth().onAuthStateChanged((user) => {
      if (user) this.setState({loggedIn: true});
      else this.setState({loggedIn: false});
    });
  }

  renderContent() {

    switch (this.state.loggedIn) {
      case true:
        return <App/>
        // return <Map/>

        break;
      case false:
        // return <LoginForm/>;
        return <LoginForm/>
        break;
      default:
        // return <Spinner size="large" />;
        //
        break;
    }
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

AppRegistry.registerComponent('walksafe', () => main);
