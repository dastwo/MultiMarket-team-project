
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../features/cart/cartSlice'
import ownerStore from '../features/ownerStore/ownerStoreSlice';
import produceReducer from '../features/product/produceSlice';
import cityReducer from "../features/city/citySlice
import sectionReducer from "../features/section/
import userSlice from '../features/user/userSlice'



const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({    product: produceReducer, cart: cartReducer , city: cityReducer, ownerStore:ownerStore, sections:sectionReducer})

const rootReducer = combineReducers({    product: produceReducer, cart: cartReducer , city: cityReducer, ownerStore:ownerStore, user:userSlice})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export let persistor = persistStore(store)

