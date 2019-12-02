import React from "react";

export default function Title(props) {
  const { title } = props;

  return (
    <div className="rl-uppercontainer">
      <div className="rl-title">{title}</div>
    </div>
  );
}
