import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/system";
import { AiFillStar, AiFillDislike } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { Avatar, Button, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat, handleRightDrawer } from "../../store/user";

function NewUserCard() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(handleRightDrawer({ open: false, name: "" }));
  };
  const handleDelete = () => {
    dispatch(deleteChat());
    handleClose();
  };
  return (
    <div style={{ background: "#eff2f5", width: "410px" }}>
      <Box className="usercard-header">
        <CgClose size={23} onClick={handleClose} />
        <Typography variant="body1">Contact info</Typography>
      </Box>
      <Box className="usercard-body">
        <Box className="user-box-info">
          <Avatar
            sx={{ width: 200, height: 200, marginBottom: 1.5 }}
            src={user.image}
          />
          <Typography fontSize={23} color="#3b4a54">
            {user.username}
          </Typography>
          <Typography fontSize={18} lineHeight={1.5} color="#6d7c87">
            {user.phone}
          </Typography>
        </Box>
        <Box className="user-card-about">
          <Typography color={"#667681"} fontSize={15}>
            About
          </Typography>
          <Typography>{user.about}</Typography>
        </Box>
        <Box className="user-card-media">
          <Typography color={"#667681"} fontSize={15}>
            Media, links and docs
          </Typography>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            onClick={() =>
              dispatch(handleRightDrawer({ open: true, name: "Media" }))
            }
          >
            0
          </Button>
        </Box>

        <Box className="user-card-other">
          <div className="starred-messages">
            <AiFillStar size={17} color="#54646f" />
            <div>
              <Typography>Starred messages</Typography>
            </div>
            <Button
              endIcon={<ArrowForwardIosIcon sx={{ width: 17 }} />}
            ></Button>
          </div>
          <div className="mute-notif">
            <BsFillBellFill size={17} color="#54646f" />
            <div>
              <Typography>Mute notifications</Typography>
            </div>
            <Switch />
          </div>
          <div className="disap-mes">
            <CiTimer size={17} color="#54646f" />
            <div>
              <Typography>Disappearing messages</Typography>
              <Typography color={"#6d7c87"}>Off</Typography>
            </div>
            <Button
              endIcon={<ArrowForwardIosIcon sx={{ width: 17 }} />}
            ></Button>
          </div>
          <div className="encryp">
            <FaLock size={17} color="#54646f" />
            <div>
              <Typography>Encryption</Typography>
              <Typography color={"#6d7c87"}>
                Messages are end-to-end encrypted. Click to verify
              </Typography>
            </div>
          </div>
        </Box>
        <Box className="user-card-ops">
          <div>
            <ImBlocked />
            <Typography>Block {user.username}</Typography>
          </div>
          <div>
            <AiFillDislike />
            <Typography>Report {user.username}</Typography>
          </div>
          <div onClick={handleDelete}>
            <MdDelete />
            <Typography>Delete chat</Typography>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default NewUserCard;
