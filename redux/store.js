import { configureStore } from '@reduxjs/toolkit';
import learningReducer from './learningSlice';

const store = configureStore({
  reducer: {
    learning: learningReducer,
  },
});

export default store;
