import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  info: false,
};

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.user = action.payload;
    },
    hanldeInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { selectUser, hanldeInfo } = userSlicer.actions;
export default userSlicer.reducer;
