import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({pressed, children}) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity activeOpacity={.6} onPress={pressed} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = {
  buttonStyle: {
    margin: 10,
    // borderWidth: 1,
    borderRadius: 100,
    // borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: '75%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: '#EF629B',
    fontSize: 16,
    fontWeight: '600'
  }
}

export {Button};
