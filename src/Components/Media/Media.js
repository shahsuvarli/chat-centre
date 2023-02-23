import React from "react";

function Media({ data }) {
  return (
    <div className="media-container">
      {data.map((item) => (
        <div className="media-card" key={item}>
          <img src={item} alt={item}/>
        </div>
      ))}
    </div>
  );
}

export default Media;
