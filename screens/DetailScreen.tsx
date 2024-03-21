import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { TaskModel } from '../models/TaskModel';
import { useTheme } from '../components/ThemeContext';
import { useRealm } from '@realm/react';
import { TaskModel } from '../models/TaskModel';
import { UpdateMode } from 'realm';

type DetailScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailScreen: React.FC<DetailScreenRouteProp> = ({
  route: {
    params: {
      task: { id, imageUrl, title, description },
    },
  },
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  const realm = useRealm();
  const { isDarkTheme } = useTheme();
  const textTheme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const saveTodo = async () => {
    let task: TaskModel = { id: id, title: currentTitle, description: currentDescription, imageUrl: currentImageUrl };
    realm.write(() => {
      realm.create('Task', task, UpdateMode.Modified);
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={isDarkTheme ? styles.darkBackgroundTheme : styles.lightBackgroundTheme}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <TextInput
        value={currentTitle}
        onChangeText={setCurrentTitle}
        placeholder="Title"
        style={[styles.title, textTheme]}
      />
      <TextInput
        value={currentDescription}
        onChangeText={setCurrentDescription}
        placeholder="Description"
        style={[styles.title, textTheme]}
      />
      <Button title="Save" onPress={saveTodo} />
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
    backgroundColor: 'white',
  },
  darkTheme: {
    color: 'white',
    backgroundColor: 'black',
  },
  lightBackgroundTheme: {
    backgroundColor: 'white',
  },
  darkBackgroundTheme: {
    backgroundColor: 'black',
  },
});

export default DetailScreen;
