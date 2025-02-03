import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OnlineState {
  isOnline: boolean;
}

const initialState: OnlineState = {
  isOnline: true,
};

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    toggleOnlineStatus: state => {
      state.isOnline = !state.isOnline;
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const selectOnlineStatus = (state: RootState) => state.online.isOnline;

export const { toggleOnlineStatus, setOnlineStatus } = onlineSlice.actions;
export default onlineSlice.reducer;
