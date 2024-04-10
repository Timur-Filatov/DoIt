import React, { ReactElement } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface TaskItemProps {
  title: string | null;
  imageUrl: string | null;
}

const TaskItem = ({ title, imageUrl }: TaskItemProps): ReactElement => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={[styles.image, styles.noImagePlaceholder]}>No Image</Text>
      )}
      <Text style={[styles.title, isDarkTheme ? styles.darkTheme : styles.lightTheme]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlignVertical: 'center',
  },
  lightTheme: {
    color: 'black',
  },
  darkTheme: {
    color: 'white',
  },
  noImagePlaceholder: {
    backgroundColor: '#aaa',
    padding: 4,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
});

export default TaskItem;
