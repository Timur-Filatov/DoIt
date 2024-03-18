import React from 'react';
import { useColorScheme, View, Image, Text, StyleSheet } from 'react-native';

interface TaskItemProps {
  title: string;
  imageUrl: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, imageUrl }) => {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text
        style={[
          styles.title,
          theme === 'dark' ? styles.darkTheme : styles.lightTheme,
        ]}>
        {title}
      </Text>
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
