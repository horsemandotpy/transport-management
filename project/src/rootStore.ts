import { configureStore } from "@reduxjs/toolkit";


import rootReducer from './store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
})

export type RootState = ReturnType<typeof store.getState>;
