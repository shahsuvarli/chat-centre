import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./Components/Auth";
import Whatsapp from "./Components/Whatsapp/Whatsapp";
import { db } from "./firebase";
import { useDispatch } from "react-redux";
import { selectAdmin } from "./store/user.js";

function App() {
  const { admin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = () => {
    setTimeout(async () => {
      const value = (
        await getDoc(doc(db, "users", localStorage.getItem("wpLogin")))
      ).data();
      dispatch(selectAdmin(value || null));
    }, 400);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return <div className="App">{admin ? <Whatsapp /> : <Auth />}</div>;
}

export default App;
