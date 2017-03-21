import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({label, value, onChangeText, autoCorrect, placeholder, secureTextEntry}) => {
  const {inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        style={inputStyle}
        value = {value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
const styles = {
  inputStyle: {
    color: '#fff',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    color: '#fff'
  },
  containerStyle: {
    margin: 10,
    // borderWidth: 1,
    borderRadius: 100,
    // borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '75%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,.2)',
    flexDirection: 'row',
    alignItems: 'center'
  },
}
export default Input;
