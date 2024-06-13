import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { images } from '../constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
const EmptyList = ({ title, subTitle }) => {
  return (
    <View className="justify-center  items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-semibold text-xl text-center text-gray-100 mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-center  text-gray-100">
        {subTitle}
      </Text>
      <CustomButton
        title="Create Video"
        containerStyle="my-5 w-full"
        textStyle="text-lg"
        handlePress={() => {
            router.push('/create')
        }}
      />
    </View>
  );
};

export default EmptyList;
