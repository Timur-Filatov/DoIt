import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import RNFS from 'react-native-fs';
import { TaskModel } from '../models/TaskModel';

type DetailScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailScreen: React.FC<DetailScreenRouteProp> = ({
  route: {
    params: {
      task: { id, imageUrl, title, description },
      onUpdated,
    },
  },
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  const theme = useColorScheme();
  const textTheme = theme === 'dark' ? styles.darkTheme : styles.lightTheme;

  const saveTodo = async () => {
    const filePath = RNFS.DocumentDirectoryPath + '/todos.json';
    let fileContents = '';
    let todos: TaskModel[] = [];
    if (await RNFS.exists(filePath)) {
      // await RNFS.unlink(filePath);
      fileContents = await RNFS.readFile(filePath, 'utf8');
      todos = JSON.parse(fileContents).todos as TaskModel[];
    } else if (!(await RNFS.exists(RNFS.DocumentDirectoryPath))) {
      RNFS.mkdir(RNFS.DocumentDirectoryPath);
    }

    if (todos.some(x => x.id === id)) {
      todos = todos.map(t =>
        t.id === id ? { ...t, title: currentTitle, description: currentDescription, imageUrl: currentImageUrl } : t,
      );
    } else {
      todos.push({ id, title: currentTitle, description: currentDescription, imageUrl: currentImageUrl });
    }
    await RNFS.writeFile(filePath, JSON.stringify({ todos }), 'utf8');
    onUpdated();
  };
  const textColorTheme =
    theme === 'dark' ? styles.darkTheme : styles.lightTheme;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={theme === 'dark' ? styles.darkBackgroundTheme : styles.lightBackgroundTheme}>
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
