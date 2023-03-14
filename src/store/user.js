import { createSlice } from "@reduxjs/toolkit";
import people from "../data/people.json";
import moment from "moment";

const initialState = {
  admin: 0,
  // admin: {
  //   id: 0,
  //   name: "Elvin",
  //   surname: "Shahsuvarli",
  //   username: "shahsuvarli",
  //   phone: "351 9033",
  //   image: "https://i.ibb.co/GV4pCwH/IMG-4973-1.png",
  //   about: "Software Developer",
  //   messages: [
  //     {
  //       text: "A watched pot never boils",
  //       timestamp: "2023-02-17 12:35:00",
  //       read: true,
  //       isSenderMe: false,
  //     },
  //     {
  //       text: "You can't judge a book by its cover",
  //       timestamp: "2023-02-17 12:45:00",
  //       read: true,
  //       isSenderMe: true,
  //     },
  //     {
  //       text: "Time heals all wounds",
  //       timestamp: "2023-02-18 00:07:00",
  //       read: true,
  //       isSenderMe: true,
  //     },
  //   ],
  //   media: [
  //     {
  //       name: "Media",
  //       list: [
  //         "https://fastly.picsum.photos/id/1054/200/300.jpg?hmac=2AMkQJkHozCbGVYoPJsFwSYmOfmPcPMYd0RtXMm-I2A",
  //         "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
  //         "https://randomuser.me/api/portraits/women/8.jpg",
  //       ],
  //     },
  //     { name: "Docs", list: ["invoice.pdf"] },
  //     {
  //       name: "Links",
  //       list: ["https://facebook.com", "https://twitter.com"],
  //     },
  //   ],
  // },
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
    register: (state, action) => {
      state.admin = action.payload;
    },
    selectUser: (state, action) => {
      state.user = action.payload;
    },
    sendMessage: (state, action) => {
      const messageObject = {
        text: action.payload,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        read: true,
        isSenderMe: true,
      };
      const newMessages = [...state.user.messages, messageObject];
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
    },
  },
});

export const {
  register,
  selectUser,
  sendMessage,
  deleteChat,
  handleLeftDrawer,
  handleRightDrawer,
  selectMediaItem,
} = userSlicer.actions;
export default userSlicer.reducer;
