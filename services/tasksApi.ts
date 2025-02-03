import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskModel } from '../models/TaskModel';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getOnlineTasks: builder.query<TaskModel[], void>({
      query: () => 'posts',
      transformResponse: (rawData: any[]) =>
        rawData.map(item => ({
          id: item.id,
          title: item.title,
          description: item.body,
          imageUrl: null,
        })),
    }),
  }),
});

export const { useGetOnlineTasksQuery } = tasksApi;
