import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
