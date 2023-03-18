import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./Components/Auth";
import Whatsapp from "./Components/Whatsapp/Whatsapp";
import { useDispatch } from "react-redux";
import { getUser } from "./store/user.js";

function App() {
  const { admin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUser());
  }, []);

  return <div className="App">{admin ? <Whatsapp /> : <Auth />}</div>;
}

export default App;
