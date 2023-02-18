import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Avatar, Box, Typography } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "./index.css";

const ProfileBox = styled(Box)`
  background-color: #eff2f5;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 420px;
  padding: 20px 0px;
  gap: 20px;
`;

function Profile() {
  const { admin } = useSelector((state) => state.user);
  return (
    <ProfileBox role="presentation">
      <Box>
        <Avatar
          sx={{ width: "200px", height: "200px" }}
          className="profile-avatar"
          src={admin.img}
        />
      </Box>
      <Box className="profile-data profile-box">
        <Typography fontSize={14} color="#008069">
          Your name
        </Typography>
        <div className="editable-div">
          <Typography fontSize={17} color="#3b4a54">
            {admin.username}
          </Typography>
          <ModeEditIcon sx={{ color: "#6a7e6f" }} />
        </div>
      </Box>
      <Typography className="profile-note" fontSize={14} color="#8696a0">
        This is not your username or pin. This name will be visible to your
        WhatsApp contacts.
      </Typography>
      <Box className="profile-about profile-box">
        <Typography fontSize={14} color="#008069">
          About
        </Typography>
        <div className="editable-div">
          <Typography fontSize={17} color="#3b4a54">
            {admin.about}
          </Typography>
          <ModeEditIcon sx={{ color: "#6a7e6f" }} />
        </div>
      </Box>
    </ProfileBox>
  );
}

export default Profile;
