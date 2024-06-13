import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '../../constants/icons';
import { StatusBar } from 'expo-status-bar';
const Icon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMethod="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={(focused ? 'font-psemibold' : 'font-pregular') + ' text-sm'}
        style={{ color: color }}
      >
        {name.toUpperCase()}
      </Text>
    </View>
  );
};
const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#cdcde0',
          tabBarStyle: {
            backgroundColor: '#161622',
            height: 85,
            borderTopWidth: 1,
            borderTopColor: '#232533',
          },
        }}
      >
        {['home', 'bookmark', 'create', 'profile'].map((tab) => (
          <Tabs.Screen
            key={tab}
            name={tab}
            options={{
              title: tab.toUpperCase(),
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <Icon
                  name={tab}
                  focused={focused}
                  color={color}
                  icon={icons[tab]}
                />
              ),
            }}
          />
        ))}
      </Tabs>
      <StatusBar style="light" />
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
