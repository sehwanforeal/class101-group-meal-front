import React from "react";

export default function NavTemplateSamll(props) {
  const { text, onClick, isActive } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={isActive === true ? "tap" : "tap-false"}
    >
      <div>{text}</div>
    </div>
  );
}
