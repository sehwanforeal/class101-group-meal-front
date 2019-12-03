import React from "react";

export default function NavTemplate(props) {
  const { text, onClick, isActive } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={
        isActive === true ? "navigation-text-wrap-done" : "navigation-text-wrap"
      }
    >
      <div className="navigation-text">{text}</div>
    </div>
  );
}
