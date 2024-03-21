import { TaskModel } from '../models/TaskModel';

export type RootStackParamList = {
  'Tasks List': {
    isOnline: boolean;
  };
  Details: {
    task: TaskModel;
    onUpdated: () => void;
  };
};
