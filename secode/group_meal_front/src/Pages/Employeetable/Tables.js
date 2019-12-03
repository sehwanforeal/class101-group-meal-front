import React from "react";

function Tables(props) {
  const { listData } = props;

  const handleClick = data => {
    props.onClick(data);
  };

  return (
    <>
      {listData.map(data => {
        return (
          <span
            key={data._id}
            onClick={e => {
              handleClick(data);
            }}
            className="table"
          >
            {data.nickName}
          </span>
        );
      })}
    </>
  );
}

export default Tables;
