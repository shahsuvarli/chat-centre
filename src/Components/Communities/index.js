import { Button, Typography } from "@mui/material";
import React from "react";
import "./index.css";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)`
  font-weight: bold;
  letter-spacing: 1.25;
  padding: 7px 30px;
  margin-top: 1;
  background-color: #216ca6;
  :hover {
    background-color: #1b527c !important;
  }
`;

function Communities() {
  return (
    <div className="communities-container">
      <img
        style={{ width: 350 }}
        src={require("../../images/com.jpg")}
        alt="communities"
      />
      <Typography fontWeight={700} variant="h2" fontSize={24}>
        Introducing communities
      </Typography>
      <Typography
        fontSize={14}
        color="#8696a0"
        textAlign={"center"}
        width={350}
      >
        Get ready to effortlessly keep your social groups in check and spread the word with style!
      </Typography>
      <StyledButton variant="contained">START A COMMUNITY</StyledButton>
    </div>
  );
}

export default Communities;
