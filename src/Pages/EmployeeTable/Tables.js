import React from "react";

function Tables(props) {
  const { listData } = props;

  const handleClick = data => {
    props.onClick(data);
  };

  return (
    <>
      {listData.map((data, idx) => {
        return (
          <span
            key={data._id}
            onClick={e => {
              handleClick(data);
            }}
            className="table"
          >
            {idx + 1 + ".    " + data.nickName}
          </span>
        );
      })}
    </>
  );
}

export default Tables;
