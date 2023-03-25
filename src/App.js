import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./Components/Auth";
import Loading from "./Components/Loading";
import Whatsapp from "./Components/Whatsapp/Whatsapp";
import { useDispatch } from "react-redux";
import { getAdmin } from "./store/user.js";

function App() {
  const { admin, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAdmin());
  }, []);

  return (
    <div className="App">
      {loading ? <Loading /> : admin ? <Whatsapp /> : <Auth />}
    </div>
  );
}

export default App;
