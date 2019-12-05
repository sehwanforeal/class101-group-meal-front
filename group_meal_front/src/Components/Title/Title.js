import React from "react";
import "./Title.scss";

function Title(props) {
  const { title } = props;
  return (
    <div className="title">
      <span>{title}</span>
    </div>
  );
}

export default Title;
