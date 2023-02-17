import React from "react";
import "./index.css";
import { CgClose } from "react-icons/cg";
import { Avatar, Button, Switch, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/system";
import { AiFillStar, AiFillDislike } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import {ImBlocked} from 'react-icons/im'
import { MdDelete } from "react-icons/md";

function UserCard() {
  return (
    <div className="usercard-container">
      <Box className="usercard-header">
        <CgClose size={23} />
        <Typography variant="body1">Contact info</Typography>
      </Box>
      <Box className="usercard-body">
        <Box className="user-box-info">
          <Avatar
            sx={{ width: 170, height: 170 }}
            src="https://i.ibb.co/GV4pCwH/IMG-4973-1.png"
          />
          <Typography fontSize={24} color="#3b4a54">
            Elvin Shahsuvarli
          </Typography>
          <Typography lineHeight={1.5} color="#6d7c87">
            +994 50 351 90 33
          </Typography>
        </Box>
        <Box className="user-card-about">
          <Typography color={"#667681"} fontSize={15}>
            About
          </Typography>
          <Typography>Всем привет! Я использую WhatsApp</Typography>
        </Box>
        <Box className="user-card-media">
          <Typography color={"#667681"} fontSize={15}>
            Media, links and docs
          </Typography>
          <Button endIcon={<ArrowForwardIosIcon />}>3</Button>
        </Box>

        <Box className="user-card-other">
          <div className="starred-messages">
            <AiFillStar size={20} color="#54646f" />
            <div>
              <Typography>Starred messages</Typography>
            </div>
            <Button endIcon={<ArrowForwardIosIcon />}></Button>
          </div>
          <div className="mute-notif">
            <BsFillBellFill size={20} color="#54646f" />
            <div>
              <Typography>Mute notifications</Typography>
            </div>
            <Switch />
          </div>
          <div className="disap-mes">
            <CiTimer size={20} color="#54646f" />
            <div>
              <Typography>Disappearing messages</Typography>
              <Typography color={"#6d7c87"}>Off</Typography>
            </div>
            <Button endIcon={<ArrowForwardIosIcon />}></Button>
          </div>
          <div className="encryp">
            <FaLock size={20} color="#54646f" />
            <div>
              <Typography>Encryption</Typography>
              <Typography color={"#6d7c87"}>Messages are end-to-end encrypted. Click to verify</Typography>
            </div>
            <Button endIcon={<ArrowForwardIosIcon />}></Button>
          </div>
        </Box>
        <Box className='user-card-ops'>
          <div>
            <ImBlocked/>
            <Typography>Block Elvin</Typography>
          </div>
          <div>
            <AiFillDislike/>
            <Typography>Report Elvin</Typography>
          </div>
          <div>
            <MdDelete/>
            <Typography>Delete chat</Typography>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default UserCard;