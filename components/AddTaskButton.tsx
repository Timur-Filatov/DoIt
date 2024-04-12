import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { Button } from 'react-native';
import { TaskModel } from '../models/TaskModel';
import { RootStackParamList } from '../AppNavigator';

const AddTaskButton = (): ReactElement => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const newItemId = Math.floor(Date.now() / 100);
  const task: TaskModel = { id: newItemId, title: null, description: null, imageUrl: null };

  const onPress = () => navigation.navigate('Details', { task: task });

  return <Button title="Add New Task" onPress={onPress} />;
};

export default AddTaskButton;
