import { configureStore } from "@reduxjs/toolkit";
//@ts-ignore
import authReducer from "./slices/authSlice";
import walletReducer from "./slices/walletSlice";
import subscriptionSlice from "./slices/subscriptionSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  storage: storage,
  key: "root",
  version: 1,
};

const reducer = combineReducers({ auth: authReducer, wallet: walletReducer,subscription:subscriptionSlice });
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
