import React from "react";
import { withRouter } from "react-router-dom";

function Row(props) {
  return (
    <div className="table-firstrow normal-row">
      <div className="cell">{props.itemType}</div>
      <div className="cell second">{props.itemName}</div>
      <div className="cell last">
        <button
          onClick={() => {
            props.history.push("/modifytype", {
              typename: props.itemType,
              itemname: props.itemName,
              typeid: props.typeID,
              itemid: props.itemID
            });
          }}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default withRouter(Row);
