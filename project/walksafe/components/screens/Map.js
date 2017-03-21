//@flow
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {View, Dimensions} from 'react-native';
import { Title, Icon, NavigationBar } from '@shoutem/ui';
import { Actions } from 'react-native-router-flux';
import Autocomplete from '../common/Autocomplete';
import Route from '../common/Route';
import Firebase from '../common/Firebase';
var {height, width} = Dimensions.get('window');



export default class Map extends Component {


    constructor(props) {
      super();
      this.state = {
        coords: {},
        userCoords: {},
        markers: [],
        users: [],
        uid: '',
        userLocRef:{},
        userDestRef: {},
        follow: true,
        found: false,
      }
      this.mapRef = null;

      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({uid: user.uid, userLocRef: Firebase.database().ref('user/'), userDestRef: Firebase.database().ref('dest/')})
        }
      });


      this.fitSelfAndMarker.bind(this);
      this.showUsers.bind(this);
    }

    componentDidMount() {

      Firebase.database().ref('user/').on("value", (snapshot) => {
        for (key in snapshot.val()) {
          if (key != this.state.uid) {
            Firebase.database().ref('accounts/').child(key).on("value", (sp) => {
              this.showUsers(snapshot.val()[key].coords, sp.val());
            }, (errorObject) => {
              console.log("The read failed: " + errorObject.code);
            })
          }
        }
      }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      });


    }

    showUsers = (latlng, obj) => {
      if (obj == undefined) {
        obj = {
          firstname: "Annonymous User"
        }
      }

      this.setState({
        users: [
          ... this.state.users, // creates the list of markers
          {
            coordinate: latlng,
            key: JSON.stringify(latlng.latitude + latlng.longitude),
            title: obj.firstname,
            pinColor: "black"
          }
        ]
      })
    }

    createMarker = (latlng) => {
      this.setState({coords: latlng})
      this.state.userDestRef.child(this.state.uid).set({
        coords: {
          latitude: this.state.coords.lat,
          longitude: this.state.coords.lng,
        },
        timestamp: Math.floor(Date.now() / 1000)
      })

      this.setState({
        markers: [
          // ... this.state.markers, // creates the list of markers
          {
            coordinate: {latitude: this.state.coords.lat,longitude: this.state.coords.lng},
            key: JSON.stringify(this.state.coords.lat + this.state.coords.lng)
          }
        ]
      })

      this.fitSelfAndMarker();
    }

    fitSelfAndMarker() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({userCoords: position.coords, follow: false});
        let bounds = this.state.markers.map((marker) => {
          return marker.coordinate;
        });
        bounds.push(position.coords);
        this.mapRef.fitToCoordinates(
          bounds,
          {edgePadding: {
            top: 110,
            right: 40,
            bottom: 40,
            left: 40
          },
          animated: true}
        );
        this.state.userLocRef.child(this.state.uid).set({
          coords:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          timestamp: Math.floor(Date.now() / 1000)
        })
      });
    }

    renderNotif() {
      Firebase.database().ref('accounts/').on("value", (sp) => {
        if(sp.val() != null) {
          console.log(sp.val());
          if (sp.val()[this.state.uid]!= null || sp.val()[this.state.uid]!= undefined) {
            if (sp.val()[this.state.uid].found != undefined) {
              console.log();
              if (sp.val()[this.state.uid].found != '') {
                console.log(sp.val()[sp.val()[this.state.uid].found].firstname);
                Actions.Notify({firstname: sp.val()[sp.val()[this.state.uid].found].firstname, phone:sp.val()[sp.val()[this.state.uid].found].phone})
                Firebase.database().ref('accounts/').child(this.state.uid).update({"search":false});
                Firebase.database().ref('accounts/').child(sp.val()[this.state.uid].found).update({"search":false});
                Firebase.database().ref('accounts/').child(this.state.uid).update({"found":''});
                Firebase.database().ref('accounts/').child(sp.val()[this.state.uid].found).update({"found":''});
              }
            }
          }
        }
      });
    }
    render( ) {
      return (

        <View style={styles.container}>
        <MapView style={styles.mapa}
          ref={(ref) => { this.mapRef = ref }}
          showsUserLocation={true}
          followsUserLocation={this.state.follow}
          showsTraffic={false}
        >
        {this.state.markers.map((marker) => {
          return (
            <MapView.Marker {...marker} />
          );
        })}
        {this.state.users.map((user) => {
          return (
            <MapView.Marker {...user} />
          );
        })}

        </MapView>
          <View style={styles.nav}>
            <Icon onPress={() => Actions.refresh({key: 'drawer', open: value => !value })} style={{width: 30, height: 30}} name="sidebar"/>
          </View>
          <View style={styles.searchbar}>
            <Autocomplete getLatLng={latlng => this.createMarker(latlng)}/>
          </View>
          <View>
             {this.renderNotif()}
          </View>
        </View>
      );
    }
}
const styles = {
  container: {
    width: width,
    height: height,
    backgroundColor: '#F5FCFF'

  },
  mapa: {
    height: height,
    width: width,
    elevation: 0,
    zIndex: 0,
    position: 'absolute'
  },
  nav: {
    height: 60,
    marginTop: 25,
    paddingRight: 10,
    flexDirection:'row',
    justifyContent: 'flex-end',
    width: width,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
    elevation: 1,
  },
  searchbar: {
    marginTop: 70,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 40,
    width: width - 55,
    zIndex: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 7,
  }
};

// <Route initial={this.state.userCoords} dest={this.state.coords} valid={true}/>
//component to add routes
