import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, SectionList, Text, View, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import { TaskModel } from '../models/TaskModel';
import { useQuery } from '@realm/react';
import TaskSchema from '../database/schemas/TaskSchema';
import AddTaskButton from '../components/AddTaskButton';
import { RootStackParamList } from '../AppNavigator';
import CustomToolbar from '../components/CustomToolbar';
import { globalStyles, spacing } from '../styles/styles';
import { lightTheme, darkTheme } from '../styles/themes';
import { useGetOnlineTasksQuery } from '../services/tasksApi';
import { selectTheme } from '../slices/themeSlice';
import { selectOnlineStatus } from '../slices/onlineSlice';
import Toast from 'react-native-simple-toast';
import { useAppSelector } from '../hooks/storeHooks';

type Section = {
  title: string;
  data: TaskModel[];
};

const MasterScreen = (): ReactElement => {
  const isOnline = useAppSelector(selectOnlineStatus);
  const isDarkTheme = useAppSelector(selectTheme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dbTasks = useQuery(TaskSchema);
  const offlineTasks = useMemo(() => JSON.parse(JSON.stringify(dbTasks)) as TaskModel[], [dbTasks]);

  const {
    data: onlineTasks = [],
    isLoading,
    isError,
    error,
  } = useGetOnlineTasksQuery(undefined, { skip: !isOnline });

  const filteredOnlineTasks = useMemo(
    () => onlineTasks.filter(t => !offlineTasks.some(ot => ot.id === t.id)),
    [onlineTasks, offlineTasks],
  );

  const shouldShowOnline = useMemo(
    () => isOnline && filteredOnlineTasks.length > 0,
    [isOnline, filteredOnlineTasks],
  );

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const onlineWithoutOffline = (onlineTasks || []).filter(
      onlineTask => !offlineTasks.some(offlineTask => offlineTask.id === onlineTask.id),
    );

    const nextSections: Section[] = [];

    if (offlineTasks.length > 0) {
      nextSections.push({ title: 'Offline Tasks', data: offlineTasks });
    }

    if (isOnline && onlineWithoutOffline.length > 0) {
      nextSections.push({ title: 'Online Tasks', data: onlineWithoutOffline });
    }

    setSections(prev =>
      JSON.stringify(prev) === JSON.stringify(nextSections) ? prev : nextSections,
    );
  }, [offlineTasks, shouldShowOnline, filteredOnlineTasks, isError, onlineTasks, isOnline, error]);

  useEffect(() => {
    if (isError) {
      Toast.showWithGravity(`Error loading Online Tasks. \n${error}`, Toast.SHORT, Toast.TOP);
      console.error('Online Tasks API Error:', error);
    }
  }, [isError, error]);

  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme]);

  const keyExtractor = useCallback((item: TaskModel) => `${item.id}-${item.title}`, []);

  return (
    <>
      <CustomToolbar isDarkTheme={isDarkTheme} />
      {isLoading && <ActivityIndicator size="large" />}
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
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
