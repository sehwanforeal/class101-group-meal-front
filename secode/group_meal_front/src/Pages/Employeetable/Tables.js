import React from "react";

function Tables(props) {
  const { listData } = props;

  const handleClick = e => {
    const name = e.target.textContent;

    props.onClick(name);
  };

  return (
    <>
      {listData.map(member => {
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
