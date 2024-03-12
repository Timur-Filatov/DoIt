import React from 'react';
import {Pressable, FlatList, useColorScheme, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TaskItem from '../components/TaskItem';
import {TaskModel} from '../models/TaskModel';
import {RootStackParamList} from '../types/RootStackParamList';

const data: TaskModel[] = [
  {
    id: 1,
    title: 'Item 1',
    description: 'Lorem ipsum Dollar amet long Descrtiption text',
    imageUrl: 'https://cdn2.thecatapi.com/images/bvp.jpg',
  },
  {
    id: 2,
    title: 'Item 2',
    description: 'Lorem ipsum Dollar amet long Item 2 Descrtiption text',
    imageUrl: 'https://cdn2.thecatapi.com/images/9kd.jpg',
  },
  {
    id: 3,
    title: 'Item 3',
    description:
      'Lorem ipsum Dollar amet longer Item 3 Descrtiption text with next Lorem ipsum Dollar and more Lorem ipsum Dollar and Lorem ipsum Dollar',
    imageUrl: 'https://cdn2.thecatapi.com/images/d2g.gif',
  },
];

const MasterScreen = () => {
  const theme = useColorScheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <Pressable onPress={() => navigation.navigate('Details', item)}>
          <TaskItem title={item.title} imageUrl={item.imageUrl} />
        </Pressable>
      )}
      style={theme === 'dark' ? styles.darkTheme : styles.lightTheme}
    />
  );
};

const styles = StyleSheet.create({
  lightTheme: {
    backgroundColor: 'white',
  },
  darkTheme: {
    backgroundColor: 'black',
  },
});

export default MasterScreen;
