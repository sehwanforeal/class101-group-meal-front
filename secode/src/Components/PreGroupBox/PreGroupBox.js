import React from "react";
import "./PreGroupBox.scss";

function PreGroupBox(props) {
  const { info } = props;

  return (
    <div className="gb-wrapper">
      {info.group.map((el, i) => {
        return (
          <div className={i === 0 ? "gb-leader" : "gb-member"}>
            {el.nickName}
          </div>
        );
      })}
    </div>
  );
}

export default PreGroupBox;
