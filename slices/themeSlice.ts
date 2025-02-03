import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    themeInitialized: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
    },
    toggleTheme: state => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.isDarkTheme;

export const { toggleTheme, setTheme, themeInitialized } = themeSlice.actions;
export default themeSlice.reducer;
