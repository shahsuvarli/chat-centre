import * as React from "react";
import Drawer from "@mui/material/Drawer";
import "./index.css";
import { useSelector } from "react-redux";
import Profile from "../Profile.js";
import DrawerHeader from "./DrawerHeader";
import Communities from "../Communities";
import NewChat from "../NewChat";

export default function TemporaryDrawer() {
  const [component, setComponent] = React.useState(<div></div>);
  const { drawer } = useSelector((state) => state.user);

  React.useEffect(() => {
    switch (drawer.name) {
      case "Profile":
        setComponent(<Profile />);
        break;
      case "Communities":
        setComponent(<Communities />);
        break;
      case "New chat":
        setComponent(<NewChat />);
        break;
      default:
        break;
    }
  }, [drawer.name]);

  const list = () => {
    return (
      <React.Fragment>
        <DrawerHeader />
        {component}
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <Drawer open={drawer.open} BackdropProps={{ style: { opacity: 0 } }}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
