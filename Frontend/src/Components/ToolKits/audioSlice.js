import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  durations: {},
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setAudioDuration(state, action) {
      const { id, duration } = action.payload;
      state.durations[id] = duration;
    },
  },
});

export const { setAudioDuration } = audioSlice.actions;

export default audioSlice.reducer;
