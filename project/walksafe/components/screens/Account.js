import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
var { height, width } = Dimensions.get( 'window' );
import {Actions} from 'react-native-router-flux';
import { Icon } from '@shoutem/ui';
import {DefaultButton, Spinner, DefaultInput, Card, CardSection} from '../common';
import Firebase from '../common/Firebase'

class Account extends Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    this.state = {
      message: props.error,
      firstname: '',
      lastname: '',
      phone: '',
      loading: false,
      uid: '',
    }
    this.renderButton.bind(this)
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid})
      }
    });
  }
  onButtonPress() {
    const {firstname, lastname} = this.state;
    this.setState({loading: true});

    var ref = Firebase.database().ref('accounts/');
    ref.child(this.state.uid).set({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      search: false,
      found: ''
    }).then(this.setState({
      loading: false
    }))


  }
  renderButton() {
    if (this.state.loading) {
      return (
        <DefaultButton>
           <Spinner size="small" />
        </DefaultButton>
      );
    }
    return (
      <DefaultButton pressed={this.onButtonPress.bind(this)}>
        Save
      </DefaultButton>
    );
  }

  // show or hide Modal based on 'hide' prop
  render() {
    return (

      <View style={styles.container}>

        <View style={styles.nav}>
            <Icon onPress={() => Actions.pop()} style={{width: 30, height: 30}} name="close"/>
        </View>
        <Card>
          <CardSection>
          <DefaultInput
              placeholder="Jane"
              autoCorrect={false}
              value = {this.state.firstname}
              onChangeText={firstname=>this.setState({firstname})}
              label="First Name:"
            />
          </CardSection>
          <CardSection>
          <DefaultInput
            placeholder="Doe"
            autoCorrect={false}
            value = {this.state.lastname}
            onChangeText={lastname=>this.setState({lastname })}
            label="Last Name:"
          />
          </CardSection>
          <CardSection>
          <DefaultInput
            placeholder="123-456-7890"
            autoCorrect={false}
            dataDetectorTypes={"phoneNumber"}
            keyboardType="phone-pad"
            value = {this.state.phone}
            returnKeyType={ 'done' }
            onChangeText={phone=>this.setState({phone })}
            label="Phone:"
          />
          </CardSection>
          <CardSection>
          {this.renderButton()}
          </CardSection>


        </Card>





      </View>
    );
  }
}

const styles = {
  container: {
    width: width,
    height: height,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  nav: {
    height: 60,
    paddingTop: 25,
    paddingLeft: 32,
    flexDirection:'row',
    justifyContent: 'flex-start',
    width: width,
    backgroundColor: '#43D2A9',
  }
}

export default Account;
