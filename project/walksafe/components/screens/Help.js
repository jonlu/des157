import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
var { height, width } = Dimensions.get( 'window' );
import {Actions} from 'react-native-router-flux';
import { Title, Icon, NavigationBar } from '@shoutem/ui';

class Help extends Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    this.state = {
      message: props.error,
    }
  }
  // show or hide Modal based on 'hide' prop
  render() {
    return (

      <View style={styles.container}>

        <View style={styles.nav}>
            <Icon onPress={() => Actions.pop()} style={{width: 30, height: 30}} name="close"/>
        </View>

        <View style={styles.body}>
          <Text style={styles.text}>
          </Text>

        </View>
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
  },
  body: {
    height: height,
  },
  text: {
    color: '#000'
  }
}

export default Help;
