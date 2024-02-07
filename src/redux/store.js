// import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectedFiltersSlice from "./slices/selectedFiltersSlice";
import selectedPageSlice from "./slices/selectedPageSlice";

const reducers = combineReducers({
  selectedFilters: selectedFiltersSlice.reducer,
  selectedPage: selectedPageSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedFilters","selectedPage"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
