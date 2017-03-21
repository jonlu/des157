import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const DefaultButton = ({pressed, children}) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={pressed} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  textStyle: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',

  }
}

export {DefaultButton};
