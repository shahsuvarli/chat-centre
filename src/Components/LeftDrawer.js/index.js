import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import Profile from "../Profile.js/index.js";
import DrawerHeader from "./DrawerHeader";
import Communities from "../Communities";
import NewChat from "../NewChat";

export default function LeftDrawer() {
  const [component, setComponent] = React.useState(<div></div>);
  const { leftDrawer } = useSelector((state) => state.user);

  React.useEffect(() => {
    switch (leftDrawer.name) {
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
  }, [leftDrawer.name]);

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
      <Drawer
        sx={{ width: 0 }}
        hideBackdrop={true}
        anchor="left"
        open={leftDrawer.open}
        BackdropProps={{ style: { opacity: 0 } }}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
