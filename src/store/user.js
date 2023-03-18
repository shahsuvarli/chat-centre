import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import people from "../data/people.json";
import moment from "moment";
import { v4 } from "uuid";
import { db } from "../firebase";

export const getUsers = createAsyncThunk("getUsers", async () => {
  const list = [];
  const usersRef = await getDocs(collection(db, "users"));
  usersRef.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
});

export const getUser = createAsyncThunk("getUser", async () => {
  const userRef = (
    await getDoc(doc(db, "users", localStorage.getItem("wpLogin")))
  ).data();
  return userRef;
});

const initialState = {
  admin: null,
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
  people: [],
  chats: [],
  leftDrawer: { open: false, name: "" },
  rightDrawer: { open: false, name: "" },
  selectedMedia: [1],
};

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      userSlicer.caseReducers.login(state, action);
    },
    login: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("wpLogin", action.payload.id);
    },
    logout: (state, action) => {
      state.admin = null;
      localStorage.removeItem("wpLogin");
    },
    loadPeople: (state, action) => {
      state.people = action.payload;
    },
    loadChats: (state, action) => {
      state.chats = action.payload;
    },
    selectUser: (state, action) => {
      state.user = action.payload;
      const chatId = state.admin.chats.find(
        (chat) => chat.userId === state.user.id
      )?.chatId;
      if (chatId) {
        // pass
      } else {
        const newId = v4();
        updateDoc(doc(db, "users", state.admin.id), {
          chats: arrayUnion({ chatId: newId, userId: state.user.id }),
        });
        updateDoc(doc(db, "users", state.user.id), {
          chats: arrayUnion({ chatId: newId, userId: state.admin.id }),
        });
        setDoc(doc(db, "chats", newId), {
          messages: [],
        });
      }
    },
    sendMessage: (state, action) => {
      const messageObject = {
        text: action.payload,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        read: false,
        senderId: state.admin.id,
      };

      const chatId = state.admin.chats.find(
        (chat) => chat.userId === state.user.id
      ).chatId;
      updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion(messageObject),
      });
      // console.log(messageObject);
      // const newMessages = [...state.user.messages, messageObject];
      // state.people.find((person) => person.id === state.user.id).messages =
      //   newMessages;
      // state.user.messages = newMessages;
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
  extraReducers: (builder) => {
    //  GET PEOPLE DETAILS
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.people = action.payload;
    });

    // GET ADMIN DETAILS
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
  },
});

export const {
  register,
  login,
  logout,
  loadPeople,
  loadChats,
  selectUser,
  sendMessage,
  deleteChat,
  handleLeftDrawer,
  handleRightDrawer,
  selectMediaItem,
} = userSlicer.actions;
export default userSlicer.reducer;
