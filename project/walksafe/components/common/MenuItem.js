import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

const MenuItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={.6} onPress={props.onPress}>
      <Text style= {{fontSize: 20, fontWeight: "200", color: 'white'}}>
        {props.children}
      </Text>
    </TouchableOpacity>

  );
}
export default MenuItem;
