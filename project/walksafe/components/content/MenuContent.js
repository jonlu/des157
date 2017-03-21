import { Text, View, Dimensions } from 'react-native';
import React, { Component } from 'react';
var { height, width } = Dimensions.get( 'window' );
import LinearGradient from 'react-native-linear-gradient';
import MenuItem from '../common/MenuItem';
import {Actions} from 'react-native-router-flux';
import Firebase from '../common/Firebase';


export default class MenuContent extends Component {


  render( ) {
    const {userStyle, itemsStyle, footerStyle, textStyle} = styles;
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#43D2A9', '#137CBF']} style={styles.visible}>
          <View style={userStyle}><Text>Jonathan Lu</Text></View>
          <View style={itemsStyle}>
            <MenuItem >Previous Walks</MenuItem>
            <MenuItem onPress={()=> Actions.Account({error: "Network failed..."})}>Account</MenuItem>
            <MenuItem onPress={()=> Actions.Help({error: "Network failed..."})}>Help</MenuItem>
            <MenuItem>Settings</MenuItem>
          </View>
          <View style={footerStyle}>
            <MenuItem onPress={() => Firebase.auth().signOut()}>Log Out</MenuItem>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = {
  container: {
    width: width,
    height: height,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'transparent'
  },

  visible: {
    height: height,
    width: 300, // just because of the way Drawer offsets the menu
    justifyContent: 'space-between'
  },

  userStyle: {
    flex: 4
  },
  itemsStyle: {
    padding: 30,
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'flex-end',

  },

  footerStyle: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 30,

  },
}
