import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { auth, db } from "../firebase";

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
  selectedChatId: "",
  selectedChat: [],
  people: [],
  userChats: [],
  leftDrawer: { open: false, name: "" },
  rightDrawer: { open: false, name: "" },
  selectedMedia: [1],
  lastMessage: "", // this is used to update messages in chat
  loading: true,
};

export const getUsers = createAsyncThunk("getUsers", async () => {
  const list = [];
  const usersRef = await getDocs(collection(db, "users"));
  usersRef.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
});

export const getUserChats = createAsyncThunk("getUserChats", async (id) => {
  const list = [];
  const chatRef = doc(db, "userChat", id);
  const data = await getDoc(chatRef).then((res) => {
    return res.data();
  });
  return data;
});

export const getAdmin = createAsyncThunk("getAdmin", async () => {
  const userRef = localStorage.getItem("wpLogin")
    ? (await getDoc(doc(db, "users", localStorage.getItem("wpLogin")))).data()
    : false;
  return userRef;
});

export const getMessages = createAsyncThunk("getMessages", async (id) => {
  const chatRef = (await getDoc(doc(db, "chats", id))).data();
  return chatRef;
});

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    register: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("wpLogin", action.payload.id);
    },
    login: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("wpLogin", action.payload.id);
    },
    logout: (state, action) => {
      state.admin = null;
      state.user = false;
      state.selectedChat = [];
      state.selectedChatId = "";
      localStorage.removeItem("wpLogin");
      signOut(auth);
    },
    loadPeople: (state, action) => {
      state.people = action.payload;
    },
    selectUser: (state, action) => {
      state.user = action.payload;
      const concIds =
        state.user.id < state.admin.id
          ? state.user.id + state.admin.id
          : state.admin.id + state.user.id;
      getDoc(doc(db, "chats", concIds))
        .then((snap) => {
          if (!snap.exists()) {
            const newDocref = doc(db, "chats", concIds);
            setDoc(newDocref, { messages: [] });
          }
        })
        .catch(() => console.log(""));
      state.selectedChatId = concIds;
    },
    sendMessage: (state, action) => {
      const messageObject = {
        text: action.payload,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        read: false,
        senderId: state.admin.id,
      };

      updateDoc(doc(db, "chats", state.selectedChatId), {
        messages: arrayUnion(messageObject),
      });

      state.lastMessage = action.payload;

      const userChatRef = doc(db, "userChat", state.admin.id);
      updateDoc(userChatRef, {
        [state.user.id]: {
          image: state.user.image,
          username: state.user.username,
          lastMes: messageObject,
        },
      });

      const userChatRef2 = doc(db, "userChat", state.user.id);
      updateDoc(userChatRef2, {
        [state.admin.id]: {
          image: state.admin.image,
          username: state.admin.username,
          lastMes: messageObject,
        },
      });
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
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.admin = action.payload || null;
      state.loading = false;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.selectedChat = action.payload.messages.reverse();
    });

    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.userChats = Object.entries(action.payload).map((e) => ({
        chat: e[1],
      }));
    });
  },
});

export const {
  setLoading,
  register,
  login,
  logout,
  selectChatId,
  loadPeople,
  selectUser,
  sendMessage,
  deleteChat,
  handleLeftDrawer,
  handleRightDrawer,
  selectMediaItem,
} = userSlicer.actions;
export default userSlicer.reducer;
