import React from "react";
import { withRouter } from "react-router-dom";

function TableRow(props) {
  const info = props.info;
  return (
    <div className="table-row">
      <div className="cell">
        {info.itemType.name + "_" + info.uniqueNumberForClient}
      </div>
      <div className="cell">{info.itemType.name}</div>
      <div className="cell">{info.model.name}</div>
      <div className="cell">{info.tags}</div>
      <div className="cell">{info.price.toLocaleString()}원</div>
      <div className="cell status">{info.memo}</div>
      <div className="cell last">
        <button
          onClick={() => {
            props.history.push("/modifyitem", info);
          }}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default withRouter(TableRow);
