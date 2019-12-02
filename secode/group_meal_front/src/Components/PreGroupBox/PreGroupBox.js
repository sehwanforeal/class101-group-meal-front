import React from "react";
import "./PreGroupBox.scss";

function PreGroupBox(props) {
  const { info } = props;

  return (
    <div className="pre-gb-body">
      <div className="gb-leader">{info[0]}</div>
      <div className="gb-firstmember">{info[1]}</div>
      <div className="gb-member">{info[2]}</div>
      <div className="gb-member">{info[3]}</div>
      <div className="gb-member">{info[4]}</div>
    </div>
  );
}

export default PreGroupBox;
