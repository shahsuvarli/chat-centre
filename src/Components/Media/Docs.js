import { CheckBox } from "@mui/icons-material";
import { Avatar, Checkbox, Typography } from "@mui/material";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import "./index.css";

function Docs({ data }) {
  return (
    <div className="docs-container">
      {data.map((item, index) => (
        <div key={index} className="docs-card-container">
          <Checkbox color="success"/>
          <div key={item} className="docs-card">
            <FaFilePdf size={25} color="#f24646" />
            <div>
              <Typography>{item}</Typography>
              <Typography color={"#92a5a7"} fontSize={13} fontWeight={500}>
                1 page • PDF • 124 kB
              </Typography>
            </div>

            <TfiDownload size={23} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Docs;
