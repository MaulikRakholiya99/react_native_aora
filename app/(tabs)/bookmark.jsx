import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyList from '../../components/EmptyList';
import { useAppWrite } from '../../lib/useAppwrite';
import { getLatestPost, getLikedPost, getPost } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobal } from '../../context/GlobalProvider';
const BookMark = () => {
  const { user } = useGlobal();
  if (!user) return null;
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: posts,
    isLoading,
    fetchData,
  } = useAppWrite(() => getLikedPost(user.$id));
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} currentUser={user} />;
        }}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bookmarked Videos
                </Text>
                <Text className="text-2xl font-semibold text-white">
                  What you like
                </Text>
              </View>
              <View className="mt-5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10 "
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyList
            title="No Data Found"
            subTitle="be a first one to upload video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default BookMark;

const styles = StyleSheet.create({});
