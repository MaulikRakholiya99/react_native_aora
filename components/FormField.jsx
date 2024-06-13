import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import icons from '../constants/icons';
const FormField = ({ title, value, handleTextChange, otherStyles }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 border-2 bg-black-100 border-black-200 focus:border-secondary rounded-2xl items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base bg-transparent outline-none"
          value={value}
          onChangeText={handleTextChange}
          placeholderTextColor="#7b7b8b"
          placeholder={`Enter your ${title}`}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye  : icons.eyeHide}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
