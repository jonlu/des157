//@flow
import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Icon} from '@shoutem/ui'
import {Actions} from 'react-native-router-flux'
var { height, width } = Dimensions.get( 'window' );


const Notify = ({firstname, phone}) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Icon onPress={() => Actions.pop()} style={{width: 30, height: 30}} name="close"/>
        <View style={styles.asdf}>
        <Text>We found you someone to walk with!</Text>
        <Text>Contact {firstname} at {phone}</Text>
        </View>


      </View>

    </View>

  )
}

const styles = {
  container: {
    width: width,
    height: height,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',

  },
  body: {
    width: 200,
    height: 200,
    backgroundColor: 'white'

  },
  asdf: {
    padding: 20
  },
  text: {
    color: '#000'
  }
}

export default Notify
