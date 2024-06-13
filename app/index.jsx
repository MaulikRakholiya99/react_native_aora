import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-slate-200">
      <Text className="text-3xl">RootLayout</Text>
      <StatusBar style="auto" />
      <Link href="/Profile">Profile</Link>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
