import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import icons from '../constants/icons';
import { router, usePathname } from 'expo-router';
const SearchInput = ({ initialQuery }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  return (
    <View className="w-full h-16 px-4 border-2 bg-black-100 border-black-200 focus:border-secondary rounded-2xl items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base bg-transparent outline-none mt-0.5 "
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholderTextColor="#cdcde0"
        placeholder={'Search for a video topic '}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert('Missing Query', 'please insert something to search');
          }
          if (pathName.startsWith('/search')) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-6 h-6" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
