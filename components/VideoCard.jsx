import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';
import Icon from 'react-native-vector-icons/AntDesign';
import { likePost } from '@/lib/appwrite';
const VideoCard = ({
  video: {
    $id,
    title,
    video,
    thumbnail,
    likes,
    users: { avatar, userName },
  },
  currentUser,
}) => {
  const [play, setPlay] = useState(false);
  const [like, setLike] = useState(false);
  const handleLike = () => {
    try {
      setLike(!like);
      likePost({ $id, currentUserId: currentUser?.$id, like: !like, likes });
    } catch (e) {
      console.log(e);
      setLike(!like);
    }
  };
  useEffect(() => {
    const liked = likes?.find((l) => l.$id === currentUser?.$id);
    if (likes && liked) {
      setLike(true);
    }
  }, [likes]);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-center">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border-secondary border-2 justify-center items-center pr-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm "
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs font-pregular text-gray-100 "
              numberOfLines={1}
            >
              {userName}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <TouchableOpacity onPress={() => handleLike()}>
            {like ? (
              <Icon name="heart" size={30} color="#CC0000" />
            ) : (
              <Icon name="hearto" size={30} color="#CC0000" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(e) => console.log(e)}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center bg-black-100"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full  "
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
