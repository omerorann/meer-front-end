// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userName: null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
    },
    clearUser(state) {
      state.token = null;
      state.userName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
