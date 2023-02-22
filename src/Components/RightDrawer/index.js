import * as React from "react";
import Drawer from "@mui/material/Drawer";
import "./index.css";
import { useSelector } from "react-redux";
import NewUserCard from "../UserCard/NewUserCard";
import UserMedia from "../Media";

export default function RightDrawer() {
  const [component, setComponent] = React.useState(<div></div>);
  const { rightDrawer } = useSelector((state) => state.user);

  React.useEffect(() => {
    switch (rightDrawer.name) {
      case "User card":
        setComponent(<NewUserCard />);
        break;
      case "Media":
        setComponent(<UserMedia />);
        break;
      default:
        break;
    }
  }, [rightDrawer.name]);

  const list = () => {
    return <React.Fragment>{component}</React.Fragment>;
  };
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={rightDrawer.open}
        BackdropProps={{ style: { opacity: 0 } }}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
