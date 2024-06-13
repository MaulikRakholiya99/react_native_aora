import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';
const zoomIn = {
  0: {
    // opacity: 0,
    scale: 0.9,
  },
  1: {
    // opacity: 1,
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    // opacity: 1,
    scale: 1.1,
  },
  1: {
    // opacity: 0,
    scale: 0.9,
  },
};

const TrendingItems = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const { thumbnail, video } = item;
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(!play)}
          className="relative flex justify-center items-center"
        >
          <ImageBackground
            source={{ uri: thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItems item={item} activeItem={activeItem} />
      )}
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
      }}
      horizontal
    />
  );
};

export default Trending;
