import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import React, { Component } from 'react';
import {View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux'
var GMapPlace = "AIzaSyB7mtgOk2DOWcvYYQ_Pg035ELalaHqN-Ok";
var Geocode = "AIzaSyD4jfCok6huqVxqIYvvNEPjg6VIHS8Nul4";
var {height, width} = Dimensions.get('window');

const Autocomplete = (props) => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Where to?'
        autoFocus={false}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={(row) => row.description}
        onPress={(data, details = null) => {
          console.log(data);
          console.log(details.geometry.location);
          // <MapView.Marker coordinate={{latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}}/>
          props.getLatLng(details.geometry.location);
          Actions.Search();
        }}

        getDefaultValue={() => {
          return '';
        }}
        query={{
          key: GMapPlace,
          language: 'en',
        }}

        styles={{
          container: {
            zIndex: 20,
            elevation: 20,

          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            zIndex: 23,
            elevation: 23,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 40,
            color: '#5d5d5d',
            fontSize: 16,
            zIndex: 24,
            elevation: 24,
          },
          poweredContainer: {
            opacity: 0
          },
          listView: {
            borderRadius: 8,
            backgroundColor: 'white',
            marginTop: 50,
            position: 'absolute',
            height: 250,
            width: width - 55

          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
        }}

        nearbyPlacesAPI='GooglePlacesSearch'
        GoogleReverseGeocodingQuery={{

        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
      />
    );
  }
export default Autocomplete;
