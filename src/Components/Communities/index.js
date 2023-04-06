import { Button, Typography } from "@mui/material";
import React from "react";
import "./index.css";

function Communities() {
  return (
    <div className="communities-container">
      <img
        style={{ width: 250 }}
        src={require("../../images/community.png")}
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
        Easyliy organize your related groups and send announcements. Now your
        communities, like neighborhoods or schools can have their own space
      </Typography>
      <Button
        sx={{
          fontWeight: "bold",
          letterSpacing: 1.25,
          padding: "7px 30px",
          marginTop: 1,
          backgroundColor: "#216CA6",
        }}
        variant="contained"
      >
        START A COMMUNITY
      </Button>
    </div>
  );
}

export default Communities;
