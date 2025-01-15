import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RightHeaderButtons from '../components/RightHeaderButtons';

const CustomToolbar = ({ isDarkTheme }) => {
  return (
    <View
      style={[
        styles.toolbarContainer,
        isDarkTheme ? styles.darkBackgroundTheme : styles.lightBackgroundTheme,
      ]}>
      <Text
        style={[
          styles.headerTheme,
          isDarkTheme ? styles.darkHeaderTheme : styles.lightHeaderTheme,
        ]}>
        Tasks List
      </Text>

      <RightHeaderButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  lightBackgroundTheme: {
    backgroundColor: 'white',
  },
  darkBackgroundTheme: {
    backgroundColor: '#222',
  },
  lightHeaderTheme: {
    color: 'black',
  },
  darkHeaderTheme: {
    color: 'white',
  },
  headerTheme: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CustomToolbar;
