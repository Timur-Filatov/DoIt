import React, { ReactElement, useEffect, useState } from 'react';
import { Pressable, FlatList, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import { TaskModel } from '../models/TaskModel';
import { RootStackParamList } from '../types/RootStackParamList';
import { useOnlineStatus } from '../contexts/OnlineStatusContext';
import { useTheme } from '../contexts/ThemeContext';
import { useQuery } from '@realm/react';
import TaskSchema from '../schemas/TaskSchema';

const MasterScreen = (): ReactElement => {
  const { isOnline } = useOnlineStatus();
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dbTasks = useQuery(TaskSchema);

  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    const convertedDBTasks: TaskModel[] = JSON.parse(JSON.stringify(dbTasks)) as TaskModel[];

    if (isOnline) {
      async function fetchData() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const json = await response.json();

          const mappedTasks: TaskModel[] = json.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.body,
            imageUrl: 'https://via.placeholder.com/150',
          }));
          const onlineExceptOffline = mappedTasks
            .filter(x => !convertedDBTasks.some(y => y.id === x.id))
            .sort(x => x.id);
          const mergedTasks = convertedDBTasks.concat(onlineExceptOffline);
          setTasks(mergedTasks);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
      return;
    }

    if (dbTasks) {
      setTasks(convertedDBTasks);
    }
  }, [dbTasks, isOnline]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate('Details', { task: item })}>
          <TaskItem title={item.title} imageUrl={item.imageUrl} />
        </Pressable>
      )}
      style={isDarkTheme ? styles.darkTheme : styles.lightTheme}
    />
  );
};

const styles = StyleSheet.create({
  lightTheme: {
    backgroundColor: 'white',
  },
  darkTheme: {
    backgroundColor: '#222',
  },
});

export default MasterScreen;
