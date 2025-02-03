import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './services/tasksApi';
import onlineReducer from './slices/onlineSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,

    online: onlineReducer,
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
