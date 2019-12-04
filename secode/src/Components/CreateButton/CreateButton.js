import React from "react";
import "./CreateButton.scss";

function CreateButton(props) {
  const { onClick, text } = props;

  return (
    <div className="tools">
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

export default CreateButton;
