import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./Components/Auth";
import Whatsapp from "./Components/Whatsapp/Whatsapp";

function App() {
  const { admin } = useSelector((state) => state.user);
  return <div className="App">{admin ? <Whatsapp /> : <Auth />}</div>;
}

export default App;
