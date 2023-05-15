import { configureStore } from '@reduxjs/toolkit';
import featuresReducer from '../redux/featuresSlice'

export default configureStore({
  reducer: {
    graph: featuresReducer,
  },
});
