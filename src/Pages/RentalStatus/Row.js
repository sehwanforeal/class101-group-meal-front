import React from "react";
import { withRouter } from "react-router-dom";

function Row(props) {
  const info = props.info;

  return (
    <div className="table-row">
      <div className="cell">
        {info.itemType.name}_{info.uniqueNumberForCilent}
      </div>
      <div className="cell"></div>
      <div className="cell">{info.owner}</div>
      <div className="cell">{info.itemType.name}</div>
      <div className="cell">{info.model.name}</div>
      <div className="cell">{info.acquiredDate}</div>
      <div className="cell">
        {info.tag.map((el, i) => {
          return (
            <span>
              {i !== 0 && <span>,</span>}
              {el}
            </span>
          );
        })}
      </div>
      <div className="cell">{info.price.toLocaleString()} 원</div>
      <div className="cell bigo">
        {info.memo}
        <div className={props.spec === props.idx ? "spec" : "no"}>
          {info.memo}
        </div>
      </div>
      <div className="cell">{info.usageType}</div>
      <div className="cell last">
        <div
          onClick={() => {
            props.history.push("/modifyitem", info);
          }}
        >
          수정
        </div>
        <div
        // onClick={() => {
        //   props.history.push("/modifyitem", info);
        // }}
        >
          반납
        </div>
      </div>
    </div>
  );
}

export default withRouter(Row);

//모델명과 태그 사이에 취득일
