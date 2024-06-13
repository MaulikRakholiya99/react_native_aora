import { Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn as signInFunc } from '../../lib/appwrite';
import { useGlobal } from '@/context/GlobalProvider';

const signIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { setUser, setIsLoggedIn } = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const submitForm = async () => {
    try {
      if (!form.email || !form.password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      setIsLoading(true);
      const currentUser = await signInFunc(form);
      setUser(currentUser);
      setIsLoggedIn(true);
      router.push('home');
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] my-6 px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-semibold mt-4">
            Login to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleTextChange={(text) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleTextChange={(text) => setForm({ ...form, password: text })}
            otherStyles="mt-7"
          />
          <CustomButton
            title={'Sign In'}
            handlePress={() => submitForm()}
            isLoading={isLoading}
            containerStyle={'mt-7'}
          />
          <View className="justify-center  pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-regular">
              Don't have an account?
            </Text>
            <Link
              href={'/signUp'}
              className="text-lg font-semibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
