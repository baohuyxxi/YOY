import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './userSlice';
import bookingSlice from './bookingSlice';
import setupOwnerSlice from '../pages/partner/SetupOwner/setupOwnerSlice';
import notificationSlice from './notificationSlice';
import globalSlice from './globalSlice';
// Tạo Redux store với các reducers đã chỉ định

const persistConfig = {
    key: 'root',
    whiteList : ['user'],
    blackList :['notification', 'settingowner'],
    storage
};
const rootReducer = combineReducers({
    user: userSlice.reducer,
    booking: bookingSlice.reducer,
    settingowner: setupOwnerSlice.reducer,
    notification: notificationSlice.reducer,
    global: globalSlice.reducer
    //user: persistReducer(userPersistConfig, userReducer),
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
