import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppWrite } from '../../lib/useAppwrite';
import { searchPost } from '../../lib/appwrite';
import EmptyList from '../../components/EmptyList';
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';
import { images } from '../../constants';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: searchedPost, fetchData } = useAppWrite(() =>
    searchPost(query)
  );

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchedPost}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Result
                </Text>
                <Text className="text-2xl font-semibold text-white">
                  {query}
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
            <SearchInput initialQuery={query} />
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

export default Search;

const styles = StyleSheet.create({});
