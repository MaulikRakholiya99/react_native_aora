import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { createPost } from '../../lib/appwrite';
import { useGlobal } from '../../context/GlobalProvider';
const create = () => {
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompts: '',
  });
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobal();

  const submitForm = async () => {
    try {
      if (!form.title || !form.video || !form.thumbnail || !form.prompts) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      setUploading(true);
      await createPost({
        ...form,
        userId: user.$id,
      });
      Alert.alert('Success', 'Video Uploaded Successfully');
      router.push('home');
      setUploading(false);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
      setUploading(false);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompts: '',
      });
      setUploading(false);
    }
  };
  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type:
        selectType === 'video'
          ? ['video/mp4', 'video/quicktime']
          : ['image/png', 'image/jpg', 'image/jpeg'],
    });
    if (!result.canceled) {
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document Picked', 'Please select a file');
      }, 1000);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          otherStyles="mt-10"
          value={form.title}
          handleTextChange={(text) => {
            setForm({ ...form, title: text });
          }}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode="cover"
                shouldPlay
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="CONTAIN"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className=" mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 flex-row rounded-2xl justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="CONTAIN"
                  className="w-5 h-5"
                />
                <Text className=" text-medium text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          otherStyles="mt-7"
          value={form.prompts}
          handleTextChange={(text) => {
            setForm({ ...form, prompts: text });
          }}
        />
        <CustomButton
          title="Submit & Publish"
          containerStyle="mt-7"
          handlePress={() => {
            submitForm();
          }}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
