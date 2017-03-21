import React from 'react';
import { TextInput, View, Text } from 'react-native';

const DefaultInput = ({label, value, onChangeText, autoCorrect, placeholder, secureTextEntry, keyboardType, dataDetectorTypes}) => {
  const {inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        dataDetectorTypes={dataDetectorTypes}
        keyboardType={keyboardType}
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
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
}
export { DefaultInput };
