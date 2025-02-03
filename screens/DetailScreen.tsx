import React, { ReactElement, useState } from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRealm } from '@realm/react';
import { TaskModel } from '../models/TaskModel';
import { UpdateMode } from 'realm';
import { RootStackParamList } from '../AppNavigator';
import { globalStyles, spacing } from '../styles/styles';
import { lightTheme, darkTheme } from '../styles/themes';
import { selectTheme } from '../slices/themeSlice';
import { useAppSelector } from '../hooks/storeHooks';

type DetailScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailScreen = ({
  route: {
    params: {
      task: { id, imageUrl, title, description },
    },
  },
}: DetailScreenRouteProp): ReactElement => {
  const [currentTitle, setCurrentTitle] = useState<string | null>(title);
  const [currentDescription, setCurrentDescription] = useState<string | null>(description);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(imageUrl);

  const isEdited: boolean =
    currentTitle !== title || currentDescription !== description || currentImageUrl !== imageUrl;

  const realm = useRealm();
  const isDarkTheme = useAppSelector(selectTheme);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  const saveTodo = async () => {
    const task: TaskModel = {
      id: id,
      title: currentTitle,
      description: currentDescription,
      imageUrl: currentImageUrl,
    };
    realm.write(() => {
      realm.create('Task', task, UpdateMode.Modified);
    });
  };

  async function requestImagePermission() {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Permission to access your images',
            message: 'We need permission to pick images from your gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access storage',
          message: 'We need permission to access your photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  const selectImage = async () => {
    const hasPermission = await requestImagePermission();
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
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      {currentImageUrl ? <Image source={{ uri: currentImageUrl }} style={styles.image} /> : null}
      <Button title="Select Image" onPress={selectImage} />
      <TextInput
        value={currentTitle ?? undefined}
        onChangeText={setCurrentTitle}
        placeholder="Enter Title"
        placeholderTextColor={theme.colors.text}
        style={[globalStyles.titleInput, globalStyles.border, { color: theme.colors.text }]}
      />
      <TextInput
        value={currentDescription ?? undefined}
        onChangeText={setCurrentDescription}
        placeholder="Enter Description"
        placeholderTextColor={theme.colors.text}
        multiline
        style={[globalStyles.multlineInput, globalStyles.border, { color: theme.colors.text }]}
      />
      <Button title="Save" onPress={saveTodo} disabled={!isEdited} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    padding: spacing.medium,
    rowGap: spacing.medium,
  },
  image: {
    width: 'auto',
    height: 300,
    margin: spacing.small,
    resizeMode: 'contain',
  },
});

export default DetailScreen;
