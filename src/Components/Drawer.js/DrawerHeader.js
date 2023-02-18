import { Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../../store/user";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DrawerHeader() {
  const dispatch = useDispatch();
  const { drawer } = useSelector((state) => state.user);
  return (
    <header className="profile-header">
      <div>
        <ArrowBackIcon color="#fff" onClick={() => dispatch(closeDrawer())} />
        <Typography color={"#fff"} variant="h1" fontSize={19} fontWeight={500}>
          {drawer.name}
        </Typography>
      </div>
    </header>
  );
}

export default DrawerHeader;
