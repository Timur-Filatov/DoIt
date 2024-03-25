import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Button, TextInput, Platform, PermissionsAndroid } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { launchImageLibrary } from 'react-native-image-picker';
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

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
          title: 'Permission to access storage',
          message: 'We need permission to access your photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const selectImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 0.7,
        selectionLimit: 1,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
          setCurrentImageUrl(response.assets[0].uri as string);
        } else {
          console.log('No image selected');
        }
      },
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={isDarkTheme ? styles.darkBackgroundTheme : styles.lightBackgroundTheme}>
      <Image source={{ uri: currentImageUrl }} style={styles.image} />
      <Button title="Select Image" onPress={selectImage} />
      <TextInput
        value={currentTitle}
        onChangeText={setCurrentTitle}
        placeholder="Title"
        style={[styles.title, styles.borderStyle, textTheme]}
      />
      <TextInput
        value={currentDescription}
        onChangeText={setCurrentDescription}
        placeholder="Description"
        multiline
        style={[styles.description, styles.borderStyle, textTheme]}
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
    rowGap: 10,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  description: {
    textAlignVertical: 'center',
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    verticalAlign: 'top',
  },
  borderStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#999',
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
