import { Checkbox } from "@mui/material";
import React from "react";
import { ReactTinyLink } from "react-tiny-link";
import "./index.css";

function Links({ data }) {
  return (
    <div className="links-container">
      {data.map((item) => (
        <div className="link-card-container" key={item}>
          <Checkbox />
          <div className="link-preview">
            <ReactTinyLink
              width="320px"
              height="100px"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url={item}
            />
            <span>
              <a target={'_blank'} rel='noreferrer' href={item}>{item}</a>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Links;
