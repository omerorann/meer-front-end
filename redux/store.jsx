// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // userSlice dosyasını daha sonra oluşturacağız

const store = configureStore({
  reducer: {
    user: userReducer, // Kullanıcı ile ilgili slice
  },
});

export default store;
