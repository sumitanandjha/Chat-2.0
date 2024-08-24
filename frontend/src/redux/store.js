import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist configuration, excluding the socket slice
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['socket'],  // Exclude socket slice from persistence
};

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket: socketReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore serializability checks for the socket actions and state
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'socket/setSocket'],
                ignoredPaths: ['socket.socket'],
            },
        }),
});

export default store;
