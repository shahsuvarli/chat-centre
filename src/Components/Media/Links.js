import React from "react";
import { ReactTinyLink } from "react-tiny-link";

function Links() {
  return (
    <div className="links-container">
      <div>
        <ReactTinyLink
          width="350px"
          height='100px'
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url="https://www.youtube.com/watch?v=F4Slqt0T7ww&list=RDm9ZuYYXRISY&index=14"
        />
      </div>
    </div>
  );
}

export default Links;
