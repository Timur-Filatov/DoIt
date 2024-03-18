import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { TaskModel } from '../models/TaskModel';
import { RootStackParamList } from '../types/RootStackParamList';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const taskModel: TaskModel = route.params as TaskModel;
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
      <Image source={{ uri: taskModel.imageUrl }} style={styles.image} />
      <Text style={[styles.title, textColorTheme]}>{taskModel.title}</Text>
      <Text style={[styles.description, textColorTheme]}>
        {taskModel.description}
      </Text>
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
