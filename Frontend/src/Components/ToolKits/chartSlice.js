import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    fetchChartStart(state) {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    fetchChartSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchChartFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { fetchChartStart, fetchChartSuccess, fetchChartFailure } = chartSlice.actions;

export default chartSlice.reducer;
