import React, { Component } from 'react';
import MapView from 'react-native-maps';

export default class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {},
      valid: props.valid
    }
    this.decode.bind(this)
    this.fetchRoute.bind(this)
    this.componentWillReceiveProps.bind(this)

  }
  componentWillReceiveProps(props) {
    const mode = 'walking';
    const APIKEY = 'AIzaSyCCgHDYCY55I0Meo9vVGBKzg8RMtCmgkOk';
    console.log(this.props.initial);
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${this.props.initial.latitude + ',' + this.props.initial.longitude}&destination=${this.props.dest.lat + ',' + this.props.dest.lng}&key=${APIKEY}&mode=${mode}`;
    if (this.props.initial.latitude != undefined) {
        this.fetchRoute(url);
    }
  }

  fetchRoute(url) {
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson.routes.length) {
            this.setState({
                coords: this.decode(responseJson.routes[0].overview_polyline.points), // definition below
                valid: false
            });
        }
    }).catch(e => {console.warn(e)});
  }

  decode = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}


  render () {

    return (
      <MapView.Polyline
        coordinates={[
            // {latitude: initial.latitude, longitude: initial.longitude}, // optional
            ...this.state.coords,
            // {latitude: final.latitude, longitude: final.longitude}, // optional
        ]}
        strokeWidth={4}
      />
    );
  }
}
