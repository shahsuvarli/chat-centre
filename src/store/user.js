import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { auth, db } from "../firebase";

const initialState = {
  admin: null,
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
          user: state.user,
          message: messageObject,
        },
      });

      const userChatRef2 = doc(db, "userChat", state.user.id);
      updateDoc(userChatRef2, {
        [state.admin.id]: {
          user: state.admin,
          message: messageObject,
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
