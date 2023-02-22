import { createSlice } from "@reduxjs/toolkit";
import people from "../data/people.json";

const initialState = {
  admin: {
    id: 0,
    name: "Elvin",
    surname: "Shahsuvarli",
    username: "Shahsuvarli",
    phone: "351 9033",
    image: "https://i.ibb.co/GV4pCwH/IMG-4973-1.png",
    about: "Software Developer",
    messages: [
      "Hey there!",
      "I'm good, thanks for asking.",
      "Yeah, it's beautiful outside.",
      "Just hanging out at home.",
      "You too, take care!",
    ],
  },
  user: false,
  people,
  leftDrawer: { open: false, name: "" },
  rightDrawer: { open: false, name: "" },
  selectedMedia: [1],
};

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.user = action.payload;
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
    handleLeftDrawer: (state, action) => {
      state.leftDrawer = {
        open: action.payload.open,
        name: action.payload.name,
      };
    },
    handleRightDrawer: (state, action) => {
      state.rightDrawer = {
        open: action.payload.open,
        name: action.payload.name,
      };
    },
    selectMediaItem: (state, action) => {
      const newFiles = action.payload.length
        ? [...state.selectedMedia, action.payload]
        : [];
      state.selectedMedia = newFiles;
      console.log(newFiles);
    },
  },
});

export const {
  selectUser,
  sendMessage,
  deleteChat,
  handleLeftDrawer,
  handleRightDrawer,
  selectMediaItem,
} = userSlicer.actions;
export default userSlicer.reducer;
