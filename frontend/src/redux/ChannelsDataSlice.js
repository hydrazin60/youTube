import { createSlice } from "@reduxjs/toolkit";

export const ChannelsDataSlice = createSlice({
  name: "ChannelsData",
  initialState: {
    ChannelsData: [],
  },
  reducers: {
    setChannelsData: (state, action) => {
      state.ChannelsData = action.payload;
    },
  },
});

export const { setChannelsData } = ChannelsDataSlice.actions;
export default ChannelsDataSlice.reducer;
