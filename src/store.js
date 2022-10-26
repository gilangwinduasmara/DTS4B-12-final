import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './reducers/movieSlice';

export const store = configureStore({
  reducer: {
    movie: movieSlice,
  },
});
