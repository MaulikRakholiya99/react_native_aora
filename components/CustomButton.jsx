import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`rounded-xl bg-secondary justify-center items-center min-h-[62px]  ${containerStyle} ${
        isLoading ? 'opacity-50' : ''
      }`}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
