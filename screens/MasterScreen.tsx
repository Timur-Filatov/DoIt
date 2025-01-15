import React, { ReactElement, useEffect, useState } from 'react';
import { Pressable, StyleSheet, SectionList, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import { TaskModel } from '../models/TaskModel';
import { useOnlineStatus } from '../contexts/OnlineStatusContext';
import { useTheme } from '../contexts/ThemeContext';
import { useQuery } from '@realm/react';
import TaskSchema from '../database/schemas/TaskSchema';
import AddTaskButton from '../components/AddTaskButton';
import { RootStackParamList } from '../AppNavigator';
import CustomToolbar from '../components/CustomToolbar';
import { globalStyles, spacing } from '../styles/styles';
import { lightTheme, darkTheme } from '../styles/themes';

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

    const updateSections = (newSection: Section) => {
      setSections(prevSections => {
        let sectionsToUpdate = [...prevSections];
        const sectionIndex = sectionsToUpdate.findIndex(
          section => section.title === newSection.title,
        );

        if (sectionIndex !== -1) {
          if (newSection.data.length > 0) {
            sectionsToUpdate[sectionIndex] = newSection;
          } else {
            sectionsToUpdate.splice(sectionIndex, 1);
          }
        } else if (newSection.data.length > 0) {
          sectionsToUpdate.push(newSection);
        }

        return sectionsToUpdate.sort((a, b) => a.title.localeCompare(b.title));
      });
    };

    let offlineSection: Section = { title: 'Offline Tasks', data: convertedDBTasks };
    updateSections(offlineSection);

    if (isOnline) {
      async function fetchData() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const json = await response.json();

          const mappedTasks: TaskModel[] = json.map(
            (item: any): TaskModel => ({
              id: item.id,
              title: item.title,
              description: item.body,
              imageUrl: null,
            }),
          );

          const onlineExceptOffline = mappedTasks
            .filter(x => !convertedDBTasks.some(y => y.id === x.id))
            .sort((a, b) => a.id - b.id);

          let onlineSection: Section = { title: 'Online Tasks', data: onlineExceptOffline };

          updateSections(onlineSection);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    } else {
      updateSections({ title: 'Online Tasks', data: [] });
    }
  }, [dbTasks, isOnline]);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <>
      <CustomToolbar isDarkTheme={isDarkTheme} />

      <SectionList
        sections={sections}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Details', { task: item })}>
            <TaskItem title={item.title} imageUrl={item.imageUrl} />
          </Pressable>
        )}
        style={{ backgroundColor: theme.colors.background }}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={[
              styles.header,
              { color: theme.colors.headerText, backgroundColor: theme.colors.headerBackground },
            ]}>
            {title}
          </Text>
        )}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.addButtonContainer}>
        <AddTaskButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    ...globalStyles.header,
    paddingLeft: spacing.medium,
  },
  contentContainer: {
    paddingTop: spacing.medium,
    paddingBottom: 100,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: spacing.xLarge,
    right: spacing.xLarge,
  },
});

export default MasterScreen;
