import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "isAuthenticated",
  initialState: false,
  reducers: {
    /**
     * @param state
     * @param action.payload
     */
    setAuth: (state, action) => action.payload,
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
