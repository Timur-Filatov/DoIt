import React, {useEffect, useState} from 'react';
import {Pressable, FlatList, useColorScheme, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TaskItem from '../components/TaskItem';
import {TaskModel} from '../models/TaskModel';
import {RootStackParamList} from '../types/RootStackParamList';
import {useOnlineStatus} from '../components/OnlineStatusContext';

const MasterScreen = () => {
  const {isOnline} = useOnlineStatus();
  const theme = useColorScheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    if (isOnline) {
      async function fetchData() {
        try {
          let response = await fetch(
            'https://jsonplaceholder.typicode.com/posts',
          );
          let json = await response.json();

          const mappedTasks: TaskModel[] = json.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.body,
            imageUrl: 'https://via.placeholder.com/150',
          }));
          setTasks(mappedTasks);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
      return;
    }

    setTasks([
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
    ]);
  }, [isOnline]);

  return (
    <FlatList
      data={tasks}
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
