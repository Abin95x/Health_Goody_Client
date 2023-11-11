import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../Redux/UserSlice/UserSlice'

const persistConfig = {
    key: 'root',
    storage,
  };
  const reducer = combineReducers({
    userReducer
  })
  
  const Persisted = persistReducer(persistConfig, reducer);
  
  const Store = configureStore({
    reducer: {
      user: Persisted 
    }
  });
  
  const persistor = persistStore(Store);
  
  export { Store, persistor }; 