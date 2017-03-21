import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { Title, Icon, NavigationBar } from '@shoutem/ui';
import Selector from '../common/Selector'
import {DefaultButton} from '../common'
import Firebase from '../common/Firebase'
var { height, width } = Dimensions.get( 'window' );


class Search extends Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    this.state = {
      minutes: 15,
      distance: 0.1,
      uid: '',
    }
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid})
      }
    });
  }

  onButtonPress() {
    Firebase.database().ref('accounts/').child(this.state.uid).update({"search":true});

    Firebase.database().ref('user/').on("value", (snapshot) => {
      for ( let key in snapshot.val()) {
        if (key != this.state.uid) {
          Firebase.database().ref('dest/').on("value", (sp) => {
            // Firebase.database().ref('dest/').child(this.state.uid).on("value", (up) => {

            console.log(sp.val()[key].coords.latitude);
            lat1= sp.val()[key].coords.latitude;
            lon1= sp.val()[key].coords.longitude;
            lat2= sp.val()[this.state.uid].coords.latitude;
            lon2= sp.val()[this.state.uid].coords.longitude;
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            console.log(dist);

              // if (+sp.val()[key].coords.latitude, +sp.val()[key].coords.longitude, +sp.val()[key].coords.latitude, +sp.val()[key].coords.longitude, "M") < this.state.distance) { //distance between uid coords and retreived coords
              if (dist < this.state.distance && snapshot.val()[key]) {
                Firebase.database().ref('accounts/').child(this.state.uid).update({"found":key});
                Firebase.database().ref('accounts/').child(key).update({"found":this.state.uid});
              }
            // })

          }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
          })
        }

      }
    })
    Actions.pop()
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={{flex: 4}}/>
        <View style={styles.nav}>
            <Icon onPress={() => Actions.pop()} style={{width: 30, height: 30}} name="close"/>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

            <Selector
              placeholder="0.1"
              autoCorrect={false}
              value = {this.state.distance}
              onChangeText={distance=>this.setState({distance })}
              label="Distance"
            />
            <Selector
              placeholder="15"
              autoCorrect={false}
              value = {this.state.minutes}
              onChangeText={minutes=>this.setState({minutes })}
              label="Minutes"
            />

            </View>
            <View style={{marginTop: 20, height: 40}}>
            <DefaultButton pressed={() => this.onButtonPress()}>
              Start Search
            </DefaultButton>
            </View>

        </View>



      </View>
    );
  }
}

const styles = {
  container: {
    width: width,
    height: height,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0)',

  },
  nav: {
    padding: 20,
    width: width,
    flex: 2,
    backgroundColor: '#fff',
  },
  body: {
  },
  text: {
    color: '#000'
  }
}

export default Search;
