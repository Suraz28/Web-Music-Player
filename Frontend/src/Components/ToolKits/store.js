import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './chartSlice';
import audioReducer from './audioSlice';

const store = configureStore({
  reducer: {
    chart: chartReducer,
    audio: audioReducer,
   
  },
});

export default store;
