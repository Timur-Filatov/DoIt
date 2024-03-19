import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';

type DetailScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

const DetailScreen: React.FC<DetailScreenRouteProp> = ({ route }) => {
  const { imageUrl, title, description } = route.params.task;
  const theme = useColorScheme();
  const textColorTheme =
    theme === 'dark' ? styles.darkTheme : styles.lightTheme;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={
        theme === 'dark'
          ? styles.darkBackgroundTheme
          : styles.lightBackgroundTheme
      }>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={[styles.title, textColorTheme]}>{title}</Text>
      <Text style={[styles.description, textColorTheme]}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    flexWrap: 'nowrap',
    padding: 10,
  },
  image: {
    width: 'auto',
    height: 300,
    margin: 5,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  description: {
    textAlignVertical: 'center',
  },
  lightTheme: {
    color: 'black',
  },
  darkTheme: {
    color: 'white',
  },
  lightBackgroundTheme: {
    backgroundColor: 'white',
  },
  darkBackgroundTheme: {
    backgroundColor: 'black',
  },
});

export default DetailScreen;
