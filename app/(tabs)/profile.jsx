import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppWrite } from '../../lib/useAppwrite';
import { getUserPost, searchPost, signOut } from '../../lib/appwrite';
import EmptyList from '../../components/EmptyList';
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';
import { icons } from '../../constants';
import { useGlobal } from '@/context/GlobalProvider';
import InfoBox from '@/components/InfoBox';
const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobal();
  if (!user) return null;
  const { query } = useLocalSearchParams();
  const { data: searchedPost, fetchData } = useAppWrite(() =>
    getUserPost(user.$id)
  );

  useEffect(() => {
    fetchData();
  }, [query]);
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/signIn');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchedPost}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} currentUser={user} />;
        }}
        ListHeaderComponent={() => (
          <View className="w-full items-center justify-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="items-end w-full mb-10 "
              onPress={() => logout()}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 rounded-lg mb-4 border-secondary border justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] "
                resizeMethod="contain"
              />
            </View>
            <InfoBox
              title={user?.userName}
              containerStyle="mt-2"
              titleStyle="text-lg"
            />
            <View className="flex-row  mt-3">
              <InfoBox
                title={searchedPost?.length || 0}
                subTitle="Posts"
                containerStyle="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox
                title={'1.2K'}
                subTitle="Followers "
                titleStyle="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyList
            title="No Video Found"
            subTitle="Nathi malta bhai ava video "
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
