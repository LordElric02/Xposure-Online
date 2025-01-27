// reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    accessToken: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },
    clearUser(state) {
      state.user = null;
      state.role = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
