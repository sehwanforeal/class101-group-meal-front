import React from "react";

function Tables(props) {
  const { memberList } = props;

  const handleClick = e => {
    const name = e.target.textContent;

    props.onClick(name);
  };

  return (
    <>
      {memberList.map(member => {
        return (
          <span onClick={handleClick} className="table">
            {member}
          </span>
        );
      })}
    </>
  );
}

export default Tables;
