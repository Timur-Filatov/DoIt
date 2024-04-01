import React, { ReactElement, useEffect, useState } from 'react';
import { Pressable, StyleSheet, SectionList, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import { TaskModel } from '../models/TaskModel';
import { RootStackParamList } from '../types/RootStackParamList';
import { useOnlineStatus } from '../contexts/OnlineStatusContext';
import { useTheme } from '../contexts/ThemeContext';
import { useQuery } from '@realm/react';
import TaskSchema from '../database/schemas/TaskSchema';
import AddTaskButton from '../components/AddTaskButton';

type Section = {
  title: string;
  data: TaskModel[];
};

const MasterScreen = (): ReactElement => {
  const { isOnline } = useOnlineStatus();
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dbTasks = useQuery(TaskSchema);

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const convertedDBTasks: TaskModel[] = JSON.parse(JSON.stringify(dbTasks)) as TaskModel[];
    let offlineSection: Section = { title: 'Offline Tasks', data: convertedDBTasks };

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

          let onlineSection: Section = { title: 'Online Tasks', data: onlineExceptOffline };
          setSections([offlineSection, onlineSection]);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
      return;
    }

    if (dbTasks) {
      setSections([offlineSection]);
    }
  }, [dbTasks, isOnline]);

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate('Details', { task: item })}>
          <TaskItem title={item.title} imageUrl={item.imageUrl} />
        </Pressable>
      )}
      style={isDarkTheme ? styles.darkBackgroundTheme : styles.lightBackgroundTheme}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={[styles.headerTheme, isDarkTheme ? styles.darkHeaderTheme : styles.lightHeaderTheme]}>
          {title}
        </Text>
      )}
      ListHeaderComponent={AddTaskButton}
    />
  );
};

const styles = StyleSheet.create({
  lightHeaderTheme: {
    color: 'black',
    backgroundColor: 'white',
  },
  darkHeaderTheme: {
    color: 'white',
    backgroundColor: 'black',
  },
  headerTheme: {
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 18,
  },
  lightBackgroundTheme: {
    backgroundColor: 'white',
  },
  darkBackgroundTheme: {
    backgroundColor: '#222',
  },
});

export default MasterScreen;
