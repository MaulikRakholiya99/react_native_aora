import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { Redirect, SplashScreen, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images';
import CustomButton from '../components/CustomButton';
import { useGlobal } from '../context/GlobalProvider';
const App = () => {
  const { isLoggedIn, loading } = useGlobal();
  // if (loading) return SplashScreen.preventAutoHideAsync();
  if (!loading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView style={{ height: '100%' }}>
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities With{' '}
              <Text className=" text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-8 text-center">
            Where creativity meets innovation: embark on a journey of endless
            possibilities with Aora.
          </Text>
          <CustomButton
            title={'Continue With Email'}
            handlePress={() => {
              router.push('signIn');
            }}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={'#161622'} barStyle={'light-content'} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
