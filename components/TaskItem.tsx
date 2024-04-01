import React, { ReactElement } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface TaskItemProps {
  title?: string | undefined;
  imageUrl?: string | undefined;
}

const TaskItem = ({ title, imageUrl }: TaskItemProps): ReactElement => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
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
});

export default TaskItem;
