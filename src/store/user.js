import { createSlice } from "@reduxjs/toolkit";
import people from "../data/people.json";

const initialState = {
  admin: {
    img: "https://i.ibb.co/GV4pCwH/IMG-4973-1.png",
    username: "Shahsuvarli",
    about: "Available",
  },
  user: false,
  info: false,
  people,
  drawer: { open: false, name: "" },
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
    sendMessage: (state, action) => {
      const newMessages = [...state.user.messages, action.payload];
      state.people.find((person) => person.id === state.user.id).messages =
        newMessages;
      state.user.messages = newMessages;
    },
    deleteChat: (state) => {
      state.people = state.people.filter(
        (person) => person.id !== state.user.id
      );
      state.info = false;
      state.user = false;
    },
    callDrawer: (state, action) => {
      state.drawer = { open: action.payload.open, name: action.payload.name };
    },
    closeDrawer:(state, action)=>{
      state.drawer = {open:false, name:''}
    }
  },
});

export const { selectUser, hanldeInfo, sendMessage, deleteChat, callDrawer, closeDrawer } =
  userSlicer.actions;
export default userSlicer.reducer;
