import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Selector = ({label, value, onChangeText, autoCorrect, placeholder, secureTextEntry}) => {
  const {inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>

      <TextInput
        keyboardType="numbers-and-punctuation"
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        style={inputStyle}
        returnKeyType="done"
        value = {value}
        onChangeText={onChangeText}
      />
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
};
const styles = {
  inputStyle: {
    color: '#333',
    fontSize: 24,
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelStyle: {
    fontSize: 12,
    flex: 1,
    color: '#333',
    backgroundColor: 'transparent',
  },
  containerStyle: {
    margin: 10,
    // borderWidth: 1,
    borderRadius: 38,
    // borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 76,
    height: 76,
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
export default Selector;
